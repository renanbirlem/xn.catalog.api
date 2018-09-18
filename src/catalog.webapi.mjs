import express from "express";

import * as core from "./catalog.api.mjs";

export const catalogWebAPI = express.Router({ mergeParams: true });

catalogWebAPI.get("/", async (request, response) => {
  let { clientKey } = request.params;

  if (response.locals.clientKey) {
    clientKey = response.locals.clientKey;
  }

  const catalog = await core.loadCatalog({ clientKey });

  response.json(catalog);
});

catalogWebAPI.post("/", async (request, response) => {
  const { clientKey } = request.params;

  const item = request.body;

  const savedItem = await core.saveItem({ clientKey, item });

  response.json(savedItem);
});
