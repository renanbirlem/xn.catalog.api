import listTreesFromDatabase from "../../core/tree/database/listTreesFromDatabase";

export default ({ client_id }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!client_id) {
                throw new Error(`client_id must be informed.`);
            }

            const result = await listTreesFromDatabase({
                client_id
            });

            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
