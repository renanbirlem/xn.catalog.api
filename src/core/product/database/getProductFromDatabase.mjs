import * as connections from "../../../connections";
import Product from "./model/product";

import debug from "debug";
const log = debug("app:catalog:product:get");

export default ({ client_id, sku }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!client_id) {
        throw new Error(`client_id must be informed.`);
      }

      if (!sku) {
        throw new Error(`sku must be informed.`);
      }
      const connection = await connections.getClientConnection({ client_id });

      const query = { client_id, sku };

      const document = await Product(connection)
        .findOne(query)
        .lean();

      log(`${client_id}:${sku} done`);

      return resolve(document);
    } catch (e) {
      return reject(new Error(e.message));
    }
  });
