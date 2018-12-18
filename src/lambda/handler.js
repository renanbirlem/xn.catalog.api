"use strict";

import listTrees from "../api/tree/listTrees";

module.exports.trees_get = async (event, context) => {
    const { client_id } = event.pathParameters;

    // if falsy client_id or invalid after some auth logic
    if (!client_id) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                message: `Invalid client_id`
            })
        };
    }

    const results = await listTrees({ client_id });

    if (results instanceof Error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Failed top retrieve trees`,
                error: results.message
            })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(results)
    };
};
