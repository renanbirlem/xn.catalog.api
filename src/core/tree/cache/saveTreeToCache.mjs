import * as connections from "../../../connections";

import debug from "debug";
const log = debug("app:tree:cache:save");

export default ({ client_id, tree }) =>
    new Promise(async (resolve, reject) => {
        try {
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
