import express from "express";

import * as core from "./catalog.api.mjs";

export const catalogWebAPI = express.Router({ mergeParams: true });

catalogWebAPI.get("/", async (request, response) => {
  const { client } = request.params;

  const catalog = await core.loadCatalog({ client });

  response.json(catalog);
});

catalogWebAPI.post("/", async (request, response) => {
  const { client } = request.params;

  const item = request.body;

  const savedItem = await core.saveItem({ client, item });

  response.json(savedItem);
});
