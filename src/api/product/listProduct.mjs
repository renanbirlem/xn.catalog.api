export default ({ client_id, ...filters }) =>
    new Promise((resolve, reject) => {
        try {
            resolve();
        } catch (e) {
            reject(new Error(`Unknown error ${e.message}`));
        }
    });
