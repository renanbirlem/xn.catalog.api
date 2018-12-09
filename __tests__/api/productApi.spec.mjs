import * as productApi from "../../src/api/productApi";

// integration test?
describe(`product api`, () => {
    it(`should expose getProduct method`, () => {
        expect(productApi).toHaveProperty("getProduct");
    });

    it(`should expose listProducts method`, () => {
        expect(productApi).toHaveProperty("listProduct");
    });

    it(`should expose saveProduct method`, () => {
        expect(productApi).toHaveProperty("saveProduct");
    });
});
