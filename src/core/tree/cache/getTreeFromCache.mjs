import * as connections from "../../../connections";

import debug from "debug";
const log = debug("app:tree:cache:get");

export default ({ client_id, tree }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(false);
        } catch (e) {
            reject(e);
        }
    });
