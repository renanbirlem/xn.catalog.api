import supertest from "supertest";
import api from "../../src/rest";
import config from "../../src/config";
import * as connections from "../../src/connections";

describe(`product integration`, () => {
    beforeAll(async () => {
        if (["development", "test"].indexOf(config.env) < 0) {
            throw new Error(`Running integration tests on a dangerous env`);
        }

        // clean collection
        const connection = await connections.getClientConnection({
            client_id: "test"
        });

        try {
            await connection.db.dropCollection("products");
        } catch (e) {}
    });

    afterAll(async () => {
        // clean collection
        const connection = await connections.getClientConnection({
            client_id: "test"
        });

        try {
            await connection.db.dropCollection("products");
        } catch (e) {}
    });

    describe(`product save`, () => {
        it(`should return a document on save`, done => {
            const document = {
                client_id: "test",
                product_id: "1",
                sku: "2",
                price_to: 1,
                url: "https://dummy",
                name: "teste"
            };

            supertest(api)
                .post(`/test/product/2`)
                .send(document)
                .expect(`Content-Type`, /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty("_id");
                    done();
                });
        });

        it(`should return updated document on save`, done => {
            const document = {
                client_id: "test",
                product_id: "1",
                sku: "2",
                price_to: 2
            };

            supertest(api)
                .post(`/test/product/2`)
                .send(document)
                .expect(`Content-Type`, /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty("price_to", 2);
                    done();
                });
        });

        it(`should return the saved document`, done => {
            supertest(api)
                .get(`/test/product/2`)
                .expect(`Content-Type`, /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).toHaveProperty("_id");
                    done();
                });
        });
    });
});
