import express from "express";
import debug from "debug";
import productApi from "../api/productApi";

const log = debug("app:rest:product");

const api = express.Router({ mergeParams: true });

api.get("/", (request, response) => response.sendStatus(501));

api.post("/:sku", (request, response) => {
    const { client_id, sku } = request.params;
    const document = request.body;

    const result = productApi.saveProduct({ client_id, sku, document });
    result.then(result => response.json(result));
    result.catch(error => response.sendStatus(500, error));
});

export default api;
