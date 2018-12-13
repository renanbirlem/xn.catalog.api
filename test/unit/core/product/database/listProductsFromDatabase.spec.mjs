import mongoose from "mongoose";
import mockingoose from "mockingoose";
import * as connections from "../../../../../src/connections";

import listProducts from "../../../../../src/core/product/database/listProductsFromDatabase";

jest.mock("../../../../../src/connections");
connections.getClientConnection.mockImplementation(() => mongoose);

describe(`products list from database`, () => {
    beforeEach(() => {
        mockingoose.Product.toReturn(
            [
                {
                    _id: "sample1"
                },
                {
                    _id: "sample2"
                }
            ],
            "find"
        );
    });

    describe(`on initialization`, () => {
        it(`should return a Promise`, () => {
            const [client_id, filters] = [1, {}];
            const result = listProducts({ client_id, filters });

            expect(result).toBeInstanceOf(Promise);
        });

        it(`should reject with an Error if invalid client_id`, () => {
            const promise = listProducts({
                client_id: null
            });

            expect(promise).rejects.toThrowError(/client_id.*informed/i);
        });

        it(`should reject with an Error something bad happens`, async () => {
            connections.getClientConnection.mockImplementationOnce(() => {
                throw new Error();
            });

            const [client_id, filters] = [1, {}];
            const promise = listProducts({ client_id, filters });

            expect(promise).rejects.toThrowError();
        });
    });

    describe(`dealing with collections`, () => {
        it(`should resolve with a documents array`, done => {
            const [client_id, filters] = [1, {}];
            const promise = listProducts({ client_id, filters });

            promise.then(result => {
                expect(Array.isArray(result)).toBeTruthy();

                result.forEach(document =>
                    expect(document).toHaveProperty("_id")
                );

                done();
            });
        });

        it(`should resolve to null if no records found`, () => {
            mockingoose.Product.toReturn(null, "find");

            const [client_id, filters] = [1, {}];
            const promise = listProducts({ client_id, filters });

            expect(promise).resolves.toBeNull();
        });
    });
});
