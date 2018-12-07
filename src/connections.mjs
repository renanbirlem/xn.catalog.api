/*eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
import mongoose from "mongoose";
import * as redis from "./core/connections/redis";
import config from "./config";

mongoose.Promise = global.Promise;

import debug from "debug";
const log = debug("app:connection");

// connections repository singleton
const repository = {};
const CONNECTIONS_KEY = Symbol("app:connections");
global[CONNECTIONS_KEY] = global[CONNECTIONS_KEY] || [];

Object.defineProperty(repository, "instance", {
  get: () => {
    return global[CONNECTIONS_KEY];
  }
});
Object.freeze(repository);

export const connectionsRepository = () => {
  // handler
  return {
    search: ({ type, id }) => {
      let found = repository.instance.filter(connectionObject => {
        return connectionObject.type == type && connectionObject.id == id;
      });

      return found.length ? found[0] : null;
    },

    add: ({
      type,
      connection,
      id,
      created_at = Date.now(),
      last_used_at = Date.now()
    }) => {
      const connectionObject = {
        get: () => {
          return connection;
        },
        type,
        id,
        created_at,
        last_used_at
      };

      repository.instance.push(connectionObject);

      return connectionObject;
    },

    touch: ({ connectionObject }) => {
      connectionObject.last_time_used = Date.now();
    }
  };
};

export const getClientConnection = async ({
  client_id,
  returnDescriptor = false
}) => {
  let repository = connectionsRepository();
  let connectionObject;

  // check active connection for this client_id
  let clientCachedConnection = repository.search({
    type: "mongodb",
    id: client_id
  });

  if (!clientCachedConnection) {
    log(`building connection for ${client_id}`);

    try {
      let newClientConnection = await mongoose.createConnection(
        config.mongodb_uri,
        {
          useNewUrlParser: true,
          dbName: client_id
        }
      );

      connectionObject = repository.add({
        type: "mongodb",
        connection: newClientConnection,
        id: client_id
      });
    } catch (error) {
      log(`connection failed for ${client_id}`);
      return null;
    }
  } else {
    log(`cached connection for ${client_id}`);
    connectionObject = clientCachedConnection;
  }

  repository.touch({ connectionObject });

  return returnDescriptor ? connectionObject : connectionObject.get();
};

export const getClientModel = async ({ factory, client_id }) => {
  const connection = await getClientConnection({ client_id });
  const model = await factory({ connection });

  return model;
};

export const getRedisConnection = async ({
  client_id,
  returnDescriptor = false
}) => {
  let repository = connectionsRepository();
  let connectionObject;

  // redis connection is global
  client_id = 1;

  // check active connection for this client_id
  let clientCachedConnection = repository.search({
    type: "redis",
    id: client_id
  });

  if (!clientCachedConnection) {
    log(`building redis connection for ${client_id}`);

    try {
      let newClientConnection = await redis.connect();

      connectionObject = repository.add({
        type: "redis",
        connection: newClientConnection,
        id: client_id
      });
    } catch (error) {
      log(`connection failed for ${client_id}`);
      return null;
    }
  } else {
    log(`cached connection for ${client_id}`);
    connectionObject = clientCachedConnection;
  }

  repository.touch({ connectionObject });

  return returnDescriptor ? connectionObject : connectionObject.get();
};
