import * as connections from "../../../connections";
import Product from "./model/product";

import debug from "debug";
const log = debug("app:catalog:product:delete");

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

      // set deleted_at
      const document = Object.assign({}, { deleted_at: new Date() });

      const result = await Product(connection).findOneAndUpdate(
        query,
        document,
        {
          new: true,
          upsert: false,
          lean: true,
          runValidators: true
        }
      );

      if (!result) {
        throw new Error(`document not found for update`);
      }

      log(`${client_id}:${sku} done`);

      return resolve(result);
    } catch (e) {
      log(`product save errored with ${e.message}`);
      return reject(new Error(e.message));
    }
  });
