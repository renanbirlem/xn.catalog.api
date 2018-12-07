export default ({ client_id, key = "sku", ...search }) =>
    new Promise((resolve, reject) => {
        try {
            resolve();
        } catch (e) {
            reject(new Error(`Unknown error ${e.message}`));
        }
    });
