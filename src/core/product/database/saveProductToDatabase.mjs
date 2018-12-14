import * as connections from "../../../connections";
import Product from "./model/product";

import debug from "debug";
const log = debug("app:catalog:product:save");

export default ({ client_id, sku, document }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!client_id) {
                throw new Error(`client_id must be informed.`);
            }

            if (!sku) {
                throw new Error(`sku must be informed ${sku}.`);
            }

            // document must inform client_id
            if (!document.client_id || document.client_id != client_id)
                throw new Error(`document client_id does not match argument.`);

            // document must provide value for given key
            if (!document.sku || document.sku != sku)
                throw new Error(`document sku does not match argument.`);

            const connection = await connections.getClientConnection({
                client_id
            });

            const query = { client_id, sku };

            // clean up document, removing identifiers that should be not updated
            // delete document._id;
            delete document.created_at;
            delete document.updated_at;
            delete document.deleted_at;

            // set updated_at
            document.updated_at = new Date();

            const model = await Product(connection);

            log(`${client_id}:${sku} trying to update...`);

            const updated = await model.findOneAndUpdate(query, document, {
                new: true,
                upsert: false,
                runValidators: true
            });

            if (!updated) {
                log(`${client_id}:${sku} not found, create.`);

                const product = await new model(document);
                await product.validate();
                await product.save();

                return resolve(product);
            } else {
                return resolve(updated);
            }
        } catch (e) {
            log(`product save errored with ${e.message}`);
            return reject(new Error(e.message));
        }
    });
