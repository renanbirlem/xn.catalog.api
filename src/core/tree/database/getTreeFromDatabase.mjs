import * as connections from "../../../connections";
import Tree from "./model/tree";

import debug from "debug";
const log = debug("app:tree:get");

export default ({ client_id, kind, tree_id }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!client_id) {
                throw new Error(`client_id must be informed.`);
            }

            if (!kind || !tree_id) {
                throw new Error(`tree kind and id must be informed.`);
            }

            const connection = await connections.getClientConnection({
                client_id
            });

            const query = { client_id, kind, tree_id };

            const document = await Tree(connection)
                .findOne(query)
                .lean();

            log(`${client_id}:${kind}:${tree_id} done`);

            return resolve(document);
        } catch (e) {
            return reject(new Error(e.message));
        }
    });
