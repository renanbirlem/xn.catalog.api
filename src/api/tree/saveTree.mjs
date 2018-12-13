import saveTreeToDatabase from "../../core/tree/database/saveTreeToDatabase";
import saveTreeToCache from "../../core/tree/cache/saveTreeToCache";

export default ({ client_id, kind, tree_id, document }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!client_id) {
                throw new Error(`client_id must be informed.`);
            }

            if (!kind) {
                throw new Error(`kind must be informed.`);
            }

            if (!tree_id) {
                throw new Error(`tree_id must be informed.`);
            }

            if (!document) {
                throw new Error(`document must be informed.`);
            }

            const result = await saveTreeToDatabase({
                client_id,
                kind,
                tree_id,
                document
            });

            if (result) {
                saveTreeToCache({ client_id, kind, tree_id, tree: result });
                resolve(result);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
