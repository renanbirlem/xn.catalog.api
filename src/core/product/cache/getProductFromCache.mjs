import * as connections from "../../../connections";

import debug from "debug";
const log = debug("app:catalog:product:cache:get");

export default ({ client_id, product }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
