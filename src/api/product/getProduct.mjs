import getProductFromDatabase from "../../core/product/database/getProductFromDatabase";
import getProductFromCache from "../../core/product/cache/getProductFromCache";
import saveProductToCache from "../../core/product/cache/saveProductToCache";

export default ({ client_id, sku }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!client_id) {
                throw new Error(`client_id must be informed.`);
            }

            if (!sku) {
                throw new Error(`sku must be informed.`);
            }

            // look for cached version
            const cached = await getProductFromCache({
                client_id,
                sku
            });

            if (cached) {
                return resolve(cached);
            }

            // if no cached version found, search on database
            const product = getProductFromDatabase({
                client_id,
                sku
            });

            if (product) {
                resolve(product);

                // if product found, save it to cache layer
                // do not await for cache operation result
                if (product) {
                    saveProductToCache({ client_id, product });
                }
            } else {
                resolve(null);
            }
        } catch (e) {
            reject(e);
        }
    });
