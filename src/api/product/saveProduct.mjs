import saveProductToDatabase from "../../core/product/database/saveProductToDatabase";
import saveProductToCache from "../../core/product/cache/saveProductToCache";
import touchRanking from "../../core/ranking/touch";

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
                touchRanking({ product: result })
                    .then(result => console.log(`ranking ok`))
                    .catch(error =>
                        console.log(`ranking errored ${error.message}`)
                    );

                resolve(result);
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
