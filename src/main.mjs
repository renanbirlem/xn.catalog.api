import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

import { catalogWebAPI } from "./catalog.webapi.mjs";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.json({ service: "xn.catalog.api" });
});

const mapClient = (request, response, next) => {
  switch (request.params.clientKey) {
    case "c1a1cdb5-9b4c-45f5-a0d7-01b9257ccd8d":
      response.locals.clientKey = "CLI0";
      break;
    case "a3946eb8-460a-42a5-9a70-18359764a973":
      response.locals.clientKey = "C0003";
      break;
  }

  next();
};

app.use("/:clientKey/catalog", mapClient, catalogWebAPI);

const port = 10002;

app.listen(process.env.PORT || port, () =>
  global.console.log(`Listening on port ${port}!`)
);
