import { loadClientCatalog } from "./core/loadClientCatalog.mjs";
import { saveClientCatalogItem } from "./core/saveClientCatalogItem.mjs";

export const loadCatalog = async ({ clientKey }) => {
  const catalog = await loadClientCatalog({ clientKey });

  return catalog;
};

export const saveItem = async ({ clientKey, item }) => {
  const savedItem = await saveClientCatalogItem({ clientKey, item });

  return savedItem;
};
