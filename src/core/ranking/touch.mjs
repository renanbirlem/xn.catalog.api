import * as connections from "../../connections";
import Ranking from "./model/ranking";

import debug from "debug";
const log = debug("app:ranking:touch");

export default ({ product }) =>
    new Promise(async (resolve, reject) => {
        try {
            const { client_id, product_id, sku } = product;
            const query = { client_id, product_id, sku };

            const document = {
                client_id,
                product_id,
                sku,
                trees: product.trees,
                price_to: product.price_to,
                price_from: product.price_from,
                price_discount_off: product.price_discount_off,
                price_discount_value: product.price_discount_value,
                is_new: product.is_new || false,
                is_promo: product.is_promo || false,
                is_available: product.is_available || false,
                is_saleable: product.is_saleable || false
            };

            document.is_saleable =
                product.images.length &&
                product.price_to &&
                product.is_available;

            const connection = await connections.getClientConnection({
                client_id
            });

            const ranking = await Ranking(connection).findOneAndUpdate(
                query,
                document,
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                    setDefaultsOnInsert: true
                }
            );

            resolve(ranking);
        } catch (e) {
            reject(e);
        }
    });
