import express from "express";
import debug from "debug";
import * as productApi from "../api/productApi";

const log = debug("app:rest:product");

const api = express.Router({ mergeParams: true });

api.get("/", (request, response) => response.sendStatus(501));

api.get("/:sku", (request, response) => {
    const { client_id, sku } = request.params;

    productApi
        .getProduct({ client_id, sku })
        .then(result => response.json(result))
        .catch(error => response.status(500).send(error.message));
});

api.post("/:sku", (request, response) => {
    const { client_id, sku } = request.params;
    const document = request.body;

    productApi
        .saveProduct({ client_id, sku, document })
        .then(result => response.json(result))
        .catch(error => {
            let statusCode = 500;
            statusCode = /validation failed/i.test(error.message)
                ? 400
                : statusCode;

            response.status(statusCode).send(error.message);
        });
});

export default api;
