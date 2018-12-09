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

            // if product found, save it to cache layer
            if (product) {
                await saveProductToCache({ client_id, product });
            }

            resolve(product);
        } catch (e) {
            reject(e);
        }
    });
