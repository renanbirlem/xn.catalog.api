import * as connections from "../../../../connections";
import Product from "./model/product";

import debug from "debug";
const log = debug("app:catalog:product:list");

export default ({ client_id, filters = {} }) =>
  new Promise(async (resolve, reject) => {
    if (!client_id) {
      return reject(new Error(`client_id must be informed.`));
    }

    try {
      const connection = await connections.getClientConnection({ client_id });

      // @todo should consider limiting this query for security reasons
      const query = Object.assign({}, filters, { client_id });

      const documents = await Product(connection)
        .find(query)
        .lean();

      log(
        `${client_id}:list returned 
        ${documents ? documents.length : 0} documents with 
        query ${JSON.stringify(query, null, 4)}`
      );

      return resolve(documents);
    } catch (e) {
      log(`${client_id}:list errored with ${e.message}`);
      return reject(new Error(e.message));
    }
  });
