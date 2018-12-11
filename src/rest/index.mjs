import os from "os";
import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import debug from "debug";
import config from "../config";
import * as connections from "../connections";

// import { treesRestApi } from "./tree";
import productsRestApi from "./product";

const log = debug("app");

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

if (config.env === "development") {
  app.use(morgan("tiny"));
  log("morgan setup");
}

app.use((request, response, next) => {
  if ("OPTIONS" === request.method) {
    response.send(200);
  } else {
    next();
  }
});

app.get("/", (request, response) => {
  const info = {
    service: process.env.npm_package_name,
    description: process.env.npm_package_description,
    version: process.env.npm_package_version,
    hostname: os.hostname(),
    env: config.env
  };

  response.json(info);
});

// @todo check for active clients somewhere, like a redis list
const authClient = async function(request, response, next) {
  let { client_id } = request.params;
  let allowed = true;

  if (!allowed) {
    log(`unauthorized client ${client_id}`);
    return response.sendStatus(403, `Unauthorized or not recognized client`);
  }

  next();
};

const clientConnections = async function(request, response, next) {
  let client_id = request.params.client_id;

  const mongodbConnection = await connections.getClientConnection({
    client_id
  });

  if (!mongodbConnection) {
    return response.status(500).send(`Failed to connect to client database.`);
  }

  next();
};

app.use("/:client_id", authClient, clientConnections);
// app.use("/:client_id/trees", treesRestApi);
app.use("/:client_id/product", productsRestApi);

export default app;
