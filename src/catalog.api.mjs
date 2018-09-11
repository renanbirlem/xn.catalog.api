import { loadClientCatalog } from "./core/loadClientCatalog.mjs";
import { saveClientCatalogItem } from "./core/saveClientCatalogItem.mjs";

export const loadCatalog = async ({ client }) => {
  const catalog = await loadClientCatalog({ client });

  return catalog;
};

export const saveItem = async ({ client, item }) => {
  const savedItem = await saveClientCatalogItem({ client, item });

  return savedItem;
};
