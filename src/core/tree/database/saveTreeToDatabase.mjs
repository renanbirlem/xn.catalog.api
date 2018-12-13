import * as connections from "../../../connections";
import Tree from "./model/tree";

import debug from "debug";
const log = debug("app:catalog:tree:save");

export default ({ client_id, kind, tree_id, document }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!client_id) {
                throw new Error(`client_id must be informed.`);
            }

            if (!kind) {
                throw new Error(`kind must be informed ${kind}.`);
            }

            if (!tree_id) {
                throw new Error(`tree_id must be informed ${tree_id}.`);
            }

            // document must match client_id
            if (!document.client_id || document.client_id != client_id)
                throw new Error(`document client_id does not match argument.`);

            // document must match kind
            if (!document.kind || document.kind != kind)
                throw new Error(`document kind does not match argument.`);

            // document must match tree_id
            if (!document.tree_id || document.tree_id != tree_id)
                throw new Error(`document tree_id does not match argument.`);

            const connection = await connections.getClientConnection({
                client_id
            });

            const query = { client_id, kind, tree_id };

            // clean up document, removing identifiers that should be not updated
            // delete document._id;
            delete document.created_at;
            delete document.updated_at;
            delete document.deleted_at;

            // set updated_at
            document.updated_at = new Date();

            const model = await Tree(connection);

            log(`${client_id}:${kind}:${tree_id} trying to update...`);

            const updated = await model.findOneAndUpdate(query, document, {
                new: true,
                upsert: false,
                runValidators: true
            });

            if (!updated) {
                log(`${client_id}:${kind}:${tree_id} not found, create.`);

                const tree = await new model(document);
                await tree.validate();
                await tree.save();

                return resolve(tree);
            } else {
                return resolve(updated);
            }
        } catch (e) {
            log(`tree save errored with ${e.message}`);
            return reject(new Error(e.message));
        }
    });
