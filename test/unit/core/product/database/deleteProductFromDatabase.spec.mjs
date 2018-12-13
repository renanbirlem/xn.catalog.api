import uuid from "uuid";
import mongoose from "mongoose";
import mockingoose from "mockingoose";
import * as connections from "../../../../../src/connections";

import deleteProduct from "../../../../../src/core/product/database/deleteProductFromDatabase";

jest.mock("../../../../../src/connections");
connections.getClientConnection.mockImplementation(() => mongoose);

describe(`product delete from database`, () => {
    beforeEach(() => {
        mockingoose.Product.toReturn(
            {
                _id: "sample"
            },
            "findOneAndUpdate"
        );
    });

    describe(`on initialization`, () => {
        it(`should return a Promise`, () => {
            const [client_id, sku] = [1, 1];
            const result = deleteProduct({ client_id, sku });

            expect(result).toBeInstanceOf(Promise);
        });

        it(`should reject with an Error if invalid client_id`, () => {
            const promise = deleteProduct({
                client_id: null
            });

            expect(promise).rejects.toThrowError(/client_id.*informed/i);
        });

        it(`should reject with an Error if invalid sku`, () => {
            const promise = deleteProduct({
                client_id: 1,
                sku: null
            });

            expect(promise).rejects.toThrowError(/sku.*informed/i);
        });

        it(`should reject with an Error something bad happens`, async () => {
            connections.getClientConnection.mockImplementationOnce(() => {
                throw new Error();
            });

            const [client_id, key, sku] = [1, "sku", 1];
            const promise = deleteProduct({ client_id, key, sku });

            expect(promise).rejects.toThrowError();
        });
    });

    describe(`dealing with documents`, () => {
        it(`should return document itself on success`, done => {
            const [client_id, key, sku] = [1, "sku", "1"];
            const document = {
                _id: uuid.v4(),
                sku: "1",
                name: "teste"
            };

            mockingoose.Product.toReturn(document, "findOneAndUpdate");

            const promise = deleteProduct({ client_id, key, sku });

            promise.then(result => {
                expect(result).toHaveProperty("_id", document._id);
                expect(result).toHaveProperty("sku", document.sku);
                done();
            });
        });

        it(`should reject with Error if document not found`, () => {
            const [client_id, key, sku] = [1, "sku", "1"];

            mockingoose.Product.toReturn(null, "findOneAndUpdate");

            const promise = deleteProduct({ client_id, key, sku });

            expect(promise).rejects.toThrowError(/document.*not found/i);
        });

        it(`should reject with Error if operation fails`, () => {
            mockingoose.Product.toReturn(new Error(), "findOneAndUpdate");

            const [client_id, key, sku] = [1, "sku", "1"];

            const promise = deleteProduct({ client_id, key, sku });

            expect(promise).rejects.toThrowError();
        });
    });
});
