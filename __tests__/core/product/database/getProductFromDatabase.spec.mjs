import mongoose from "mongoose";
import mockingoose from "mockingoose";
import * as connections from "../../../../src/connections";

import getProduct from "../../../../src/core/product/database/getProductFromDatabase";

jest.mock("../../../../src/connections");
connections.getClientConnection.mockImplementation(() => mongoose);

describe(`product get from database`, () => {
    beforeEach(() => {
        mockingoose.Product.toReturn(
            {
                _id: "sample"
            },
            "findOne"
        );
    });

    describe(`on initialization`, () => {
        it(`should return a Promise`, () => {
            const [client_id, sku] = [1, 2];
            const result = getProduct({ client_id, sku });

            expect(result).toBeInstanceOf(Promise);
        });

        it(`should reject with an Error if invalid client_id`, () => {
            const promise = getProduct({
                client_id: null,
                sku: 1
            });

            expect(promise).rejects.toThrowError(/client_id.*informed/i);
        });

        it(`should reject with an Error if invalid sku`, async () => {
            const promise = getProduct({
                client_id: 1,
                sku: null
            });

            expect(promise).rejects.toThrowError(/sku.*informed/i);
        });

        it(`should reject with an Error something bad happens`, async () => {
            connections.getClientConnection.mockImplementationOnce(() => {
                throw new Error();
            });

            const [client_id, sku] = [1, 2];
            const promise = getProduct({ client_id, sku });

            expect(promise).rejects.toThrowError();
        });
    });

    describe(`dealing with documents`, () => {
        it(`document must have an _id`, done => {
            const [client_id, sku] = [1, 2];
            const promise = getProduct({ client_id, sku });

            promise.then(result => {
                expect(typeof result).toEqual("object");
                expect(result).toHaveProperty("_id", "sample");
                done();
            });
        });

        it(`should resolve to null if not found`, () => {
            mockingoose.Product.toReturn(null, "findOne");

            const [client_id, sku] = [1, 2];
            const promise = getProduct({ client_id, sku });

            expect(promise).resolves.toBeNull();
        });
    });
});
