import saveProduct from "../../../src/api/product/saveProduct";
import saveProductToDatabase from "../../../src/core/product/database/saveProductToDatabase";
import saveProductToCache from "../../../src/core/product/cache/saveProductToCache";

jest.mock("../../../src/core/product/database/saveProductToDatabase");
jest.mock("../../../src/core/product/cache/saveProductToCache");

// integration test?
describe(`product api`, () => {
    describe(`save product`, () => {
        it(`should return a Promise`, () => {
            const result = saveProduct({});
            expect(result).toBeInstanceOf(Promise);
        });

        describe(`validate arguments`, () => {
            it(`should reject with Error if invalid client_id`, () => {
                const result = saveProduct({
                    client_id: null
                });

                expect(result).rejects.toThrowError(/client_id.*informed/i);
            });

            it(`should reject with Error if invalid sku`, () => {
                const result = saveProduct({
                    client_id: 1,
                    sku: null
                });

                expect(result).rejects.toThrowError(/sku.*informed/i);
            });
        });

        describe(`to database`, () => {
            it(`should call saveProductToDatabase`, done => {
                let [client_id, product_id, sku] = [1, 1, 2];

                const document = {
                    product_id,
                    sku,
                    client_id
                };

                const args = {
                    client_id,
                    sku,
                    document
                };

                const result = saveProduct(args);

                result.then(result => {
                    expect(saveProductToDatabase).toBeCalledWith(args);
                    done();
                });
            });

            it(`should call saveProductToCache`, done => {
                let [client_id, product_id, sku] = [1, 1, 2];

                const document = {
                    product_id,
                    sku,
                    client_id
                };

                const mock = saveProductToDatabase.mockImplementationOnce(
                    () => document
                );

                const result = saveProduct({
                    client_id,
                    sku,
                    document
                });

                const cacheArgs = {
                    client_id,
                    sku,
                    product: document
                };

                result.then(result => {
                    // this should be here, since this test not address getProductFromDatabase?
                    expect(mock).toBeCalled();

                    expect(saveProductToCache).toBeCalledWith(cacheArgs);
                    done();
                });
            });
        });

        it(`should resolve null if operation fails`, () => {
            saveProductToDatabase.mockImplementationOnce(() => null);

            const result = saveProduct({
                client_id: 1,
                sku: 1,
                document: {}
            });

            expect(result).resolves.toBeNull();
        });

        it(`should reject with Error if something bad happens`, () => {
            saveProductToDatabase.mockImplementationOnce(() => {
                throw new Error();
            });

            const result = saveProduct({
                client_id: 1,
                sku: 1,
                document: {}
            });

            expect(result).rejects.toThrowError();
        });
    });
});
