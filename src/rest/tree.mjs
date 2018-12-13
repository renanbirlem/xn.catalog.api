import express from "express";
import debug from "debug";
import * as treeApi from "../api/treeApi";

const log = debug("app:rest:tree");

const api = express.Router({ mergeParams: true });

api.get("/", (request, response) => response.sendStatus(501));

api.get("/catalog", (request, response) => {
    const { client_id } = request.params;

    treeApi
        .listTrees({ client_id })
        .then(result => response.json(result))
        .catch(error => response.status(500).send(error.message));
});

api.post("/:kind/:tree_id", (request, response) => {
    const { client_id, kind, tree_id } = request.params;
    const document = request.body;

    treeApi
        .saveTree({ client_id, kind, tree_id, document })
        .then(result => response.json(result))
        .catch(error => response.status(500).send(error.message));
});

export default api;
