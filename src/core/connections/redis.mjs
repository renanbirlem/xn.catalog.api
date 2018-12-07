import redis from "redis";
import debug from "debug";
const log = debug("app:connection:redis");

import config from "../../config";

export const connect = () => {
  return new Promise((resolve, reject) => {
    var options = {
      url: config.redis_uri,
      retry_strategy: function(options) {
        if (options.error && options.error.code === "ECONNREFUSED") {
          throw new Error(`Failed to connect to Redis server.`);
        }

        if (options.total_retry_time > 1000 * 60 * 60) {
          throw new Error(`Retry timeout exceeded.`);
        }

        if (options.attempt > 10) {
          throw new Error(`Retry attempts exceeded.`);
        }

        return Math.min(options.attempt * 100, 3000);
      }
    };

    if (options.url.startsWith("rediss://")) {
      options.tls = {
        servername: new URL(options.url).hostname
      };
    }

    const connection = redis.createClient(options);

    connection.on("error", error => {
      log(`Redis errored with ${error}.`);
      reject(error);
    });

    connection.on("connect", () => {
      log(`Connection succeed`);
      resolve(connection);
    });
  });
};
