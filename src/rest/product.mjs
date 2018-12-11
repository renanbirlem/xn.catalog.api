import express from "express";
import debug from "debug";

const log = debug("app:rest:product");

const api = express.Router({ mergeParams: true });

api.get("/", (request, response) => response.sendStatus(501));

export default api;
