import { getClientCatalog } from "./core/getClientCatalog.mjs";
import { saveClientCatalogItem } from "./core/saveClientCatalogItem.mjs";

export const loadCatalog = async ({ client }) => {
  const catalog = await getClientCatalog({ client });

  return catalog;
};

export const saveItem = async ({ client, item }) => {
  const savedItem = await saveClientCatalogItem({ client, item });

  return savedItem;
};
