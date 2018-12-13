import * as connections from "../../../connections";
import Tree from "./model/tree";

import debug from "debug";
const log = debug("app:tree:list");

export default ({ client_id, filters = {} }) =>
    new Promise(async (resolve, reject) => {
        if (!client_id) {
            return reject(new Error(`client_id must be informed.`));
        }

        try {
            const connection = await connections.getClientConnection({
                client_id
            });

            // @todo should consider limiting this query for security reasons
            const query = Object.assign({}, filters, { client_id });

            const documents = await Tree(connection)
                .find(query)
                .lean();

            return resolve(documents);
        } catch (e) {
            return reject(new Error(e.message));
        }
    });
