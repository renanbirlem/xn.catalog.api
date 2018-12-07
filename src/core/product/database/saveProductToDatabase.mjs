import * as connections from "../../../connections";
import Product from "./model/product";

import debug from "debug";
const log = debug("app:catalog:product:save");

export default ({ client_id, key = "sku", document }) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!client_id) throw new Error(`client_id must be informed.`);

      // document must provide value for given key
      if (!document.hasOwnProperty(key))
        throw new Error(`${key} must be present at document.`);

      const connection = await connections.getClientConnection({ client_id });

      const query = { client_id };
      query[key] = document[key];

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

      log(`${client_id}:${key}:${document[key]} done`);

      return resolve(result);
    } catch (e) {
      log(`product save errored with ${e.message}`);
      return reject(new Error(e.message));
    }
  });
