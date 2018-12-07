import * as connections from "../../../connections";
import Product from "./model/product";

import debug from "debug";
const log = debug("app:catalog:product:get");

export default ({ client_id, key = "sku", ...search }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!client_id) throw new Error(`client_id must be informed.`);

      if (!search.hasOwnProperty(key))
        throw new Error(`${key} must be informed.`);

      const connection = await connections.getClientConnection({ client_id });

      const query = { client_id };
      query[key] = search[key];

      const document = await Product(connection)
        .findOne(query)
        .lean();

      log(`${client_id}:${key}:${search[key]} done`);

      return resolve(document);
    } catch (e) {
      log(`${client_id}:${key}:${search[key]} errored with ${e.message}`);
      return reject(new Error(e.message));
    }
  });
