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

catalogWebAPI.post("/:itemId", async (request, response) => {
  // este pedaço de código é repetido em toda parte para acomodar clientes legado... <
  let { clientKey } = request.params;

  if (response.locals.clientKey) {
    clientKey = response.locals.clientKey;
  }
  // este pedaço de código é repetido em toda parte para acomodar clientes legado... >

  const item = request.body;

  const savedItem = await core.saveItem({ clientKey, item });

  response.json(savedItem);
});
