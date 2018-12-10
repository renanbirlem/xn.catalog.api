import saveProductToDatabase from "../../core/product/database/saveProductToDatabase";
import saveProductToCache from "../../core/product/cache/saveProductToCache";

export default ({ client_id, sku, document }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!client_id) {
                throw new Error(`client_id must be informed.`);
            }

            if (!sku) {
                throw new Error(`sku must be informed.`);
            }

            if (!document) {
                throw new Error(`document must be informed.`);
            }

            const result = await saveProductToDatabase({
                client_id,
                sku,
                document
            });

            if (result) {
                saveProductToCache({ client_id, sku, product: result });
                resolve(result);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
