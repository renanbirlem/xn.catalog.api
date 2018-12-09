import getProduct from "../../../src/api/product/getProduct";
import getProductFromDatabase from "../../../src/core/product/database/getProductFromDatabase";
import getProductFromCache from "../../../src/core/product/cache/getProductFromCache";
import saveProductToCache from "../../../src/core/product/cache/saveProductToCache";

jest.mock("../../../src/core/product/database/getProductFromDatabase");
jest.mock("../../../src/core/product/cache/saveProductToCache");
jest.mock("../../../src/core/product/cache/getProductFromCache");

// integration test?
describe(`product api`, () => {
    describe(`get product`, () => {
        it(`should return a Promise`, () => {
            const result = getProduct({});
            expect(result).toBeInstanceOf(Promise);
        });

        describe(`validate arguments`, () => {
            it(`should reject with Error if invalid client_id`, () => {
                const result = getProduct({
                    client_id: undefined
                });

                expect(result).rejects.toThrowError(/client_id.*informed/i);
            });

            it(`should reject with Error if invalid sku`, () => {
                const result = getProduct({
                    client_id: 1,
                    sku: null
                });

                expect(result).rejects.toThrowError(/sku.*informed/i);
            });
        });

        describe(`from cache`, () => {
            it(`should call getProductFromCache`, done => {
                let [client_id, product_id, sku] = [1, 1, 2];

                const documentMock = {
                    product_id,
                    sku,
                    client_id
                };

                const mock = getProductFromCache.mockImplementationOnce(
                    () => documentMock
                );

                const result = getProduct({
                    client_id,
                    sku
                });

                const cacheArgs = {
                    client_id,
                    sku: documentMock.sku
                };

                result.then(result => {
                    expect(mock).toBeCalledWith(cacheArgs);
                    expect(result).toMatchObject(documentMock);
                    done();
                });
            });
        });

        describe(`from database`, () => {
            it(`should call getProductFromDatabase`, done => {
                const args = {
                    client_id: 1,
                    sku: 2
                };

                const result = getProduct(args);

                result.then(result => {
                    expect(getProductFromDatabase).toBeCalledWith(args);
                    done();
                });
            });

            it(`should call saveProductToCache`, done => {
                let [client_id, product_id, sku] = [1, 1, 2];

                const documentMock = {
                    product_id,
                    sku,
                    client_id
                };

                const mock = getProductFromDatabase.mockImplementationOnce(
                    () => documentMock
                );

                const result = getProduct({
                    client_id,
                    sku
                });

                const cacheArgs = {
                    client_id,
                    product: documentMock
                };

                result.then(result => {
                    // this should be here, since this test not address getProductFromDatabase?
                    expect(mock).toBeCalled();

                    expect(saveProductToCache).toBeCalledWith(cacheArgs);
                    done();
                });
            });
        });

        it(`should resolve null if document not found`, () => {});

        it(`should reject with Error if something bad happens`, () => {});
    });
});
