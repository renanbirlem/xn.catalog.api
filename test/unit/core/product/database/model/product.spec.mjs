import mongoose from "mongoose";
import Product from "../../../../../../src/core/product/database/model/product";

describe(`product database model`, () => {
    it(`should return a mongoose model`, () => {
        const result = Product(mongoose);
        expect(result).toHaveProperty("modelName", "Product");
    });
});
