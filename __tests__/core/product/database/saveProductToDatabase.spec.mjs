import uuid from "uuid";
import mongoose from "mongoose";
import mockingoose from "mockingoose";
import * as connections from "../../../../src/connections";

import saveProduct from "../../../../src/core/product/database/saveProductToDatabase";

jest.mock("../../../../src/connections");
connections.getClientConnection.mockImplementation(() => mongoose);

describe(`product save to database`, () => {
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
            const [client_id, document] = [1, { sku: 1, name: "teste" }];
            const result = saveProduct({ client_id, document });

            expect(result).toBeInstanceOf(Promise);
        });

        it(`should reject with an Error if invalid client_id`, () => {
            const promise = saveProduct({
                client_id: null,
                sku: 1
            });

            expect(promise).rejects.toThrowError(/client_id.*informed/i);
        });

        it(`should reject with an Error if document does not have key`, async () => {
            const promise = saveProduct({
                client_id: 1,
                document: { name: "teste" } // expects sku property
            });

            expect(promise).rejects.toThrowError(/sku.*present/i);
        });

        it(`should reject with an Error if invalid search value`, async () => {
            const promise = saveProduct({
                client_id: 1,
                key: "product_id",
                document: { sku: 1, name: "teste" } // expects product_id property
            });

            expect(promise).rejects.toThrowError(/product_id.*present/i);
        });

        it(`should reject with an Error something bad happens`, async () => {
            connections.getClientConnection.mockImplementationOnce(() => {
                throw new Error();
            });

            const [client_id, document] = [1, { sku: 1, name: "teste" }];
            const promise = saveProduct({ client_id, document });

            expect(promise).rejects.toThrowError();
        });
    });

    describe(`dealing with documents`, () => {
        it(`result must match updated document`, done => {
            const [client_id, document] = [
                1,
                { _id: uuid.v4(), sku: "1", name: "teste" }
            ];

            mockingoose.Product.toReturn(document, "findOneAndUpdate");

            const promise = saveProduct({ client_id, document });

            promise.then(result => {
                expect(result).toHaveProperty("_id", document._id);
                expect(result).toHaveProperty("sku", document.sku);
                done();
            });
        });

        it(`result must have an _id when inserting`, done => {
            const [client_id, document] = [
                1,
                {
                    // _id: uuid.v4(), a new _id should be returned
                    sku: "1",
                    name: "teste"
                }
            ];

            mockingoose.Product.toReturn(document, "findOneAndUpdate");

            const promise = saveProduct({ client_id, document });

            promise.then(result => {
                expect(result).toHaveProperty("_id");
                expect(result).toHaveProperty("sku", document.sku);
                done();
            });
        });

        it(`should reject to an Error if operation fails`, () => {
            mockingoose.Product.toReturn(new Error(), "findOneAndUpdate");

            const [client_id, document] = [
                1,
                {
                    // _id: uuid.v4(), a new _id should be returned
                    sku: "1",
                    name: "teste"
                }
            ];

            const promise = saveProduct({ client_id, document });

            expect(promise).rejects.toThrowError();
        });
    });
});
