import * as connections from "../../../connections";
import Product from "./model/product";

import debug from "debug";
const log = debug("app:catalog:product:save");

export default ({ client_id, sku, document }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!client_id) {
        throw new Error(`client_id must be informed.`);
      }

      if (!sku) {
        throw new Error(`sku must be informed ${sku}.`);
      }

      // document must provide value for given key
      if (!document.sku || document.sku != sku)
        throw new Error(`document sku does not match argument.`);

      const connection = await connections.getClientConnection({ client_id });

      const query = { client_id, sku };

      // clean up document, removing identifiers that should be not updated
      // delete document._id;
      delete document.sku;
      delete document.product_id;
      delete document.created_at;
      delete document.updated_at;
      delete document.deleted_at;

      // set updated_at
      document.updated_at = new Date();

      const result = await Product(connection).findOneAndUpdate(
        query,
        document,
        {
          new: true,
          upsert: true,
          lean: true,
          runValidators: true,
          setDefaultsOnInsert: true
        }
      );

      log(`${client_id}:${sku} done`);

      return resolve(result);
    } catch (e) {
      log(`product save errored with ${e.message}`);
      return reject(new Error(e.message));
    }
  });
