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

app.use("/:clientKey/catalog", catalogWebAPI);

const port = 10002;

app.listen(process.env.PORT || port, () =>
  global.console.log(`Listening on port ${port}!`)
);
