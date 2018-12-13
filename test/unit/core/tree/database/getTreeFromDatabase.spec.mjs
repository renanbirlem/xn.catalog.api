// import mongoose from "mongoose";
// import mockingoose from "mockingoose";
// import * as connections from "../../../../../src/connections";

// import getTreeFromDatabase from "../../../../../src/core/tree/database/getTreeFromDatabase";

// jest.mock("../../../../../src/connections");
// connections.getClientConnection.mockImplementation(() => mongoose);

// describe(`tree get from database`, () => {
//     beforeEach(() => {
//         mockingoose.Tree.toReturn(
//             {
//                 _id: "sample"
//             },
//             "findOne"
//         );
//     });

//     describe(`on initialization`, () => {
//         it(`should return a Promise`, () => {
//             const [client_id, kind, tree_id] = [1, "category", 2];
//             const result = getTreeFromDatabase({ client_id, kind, tree_id });

//             expect(result).toBeInstanceOf(Promise);
//         });

//         it(`should reject with an Error if invalid client_id`, () => {
//             const [client_id, kind, tree_id] = [1, "category", 2];
//             const promise = getTreeFromDatabase({ client_id, kind, tree_id });

//             expect(promise).rejects.toThrowError(/client_id.*informed/i);
//         });

//         it(`should reject with an Error if invalid kind`, async () => {
//             const [client_id, kind, tree_id] = [1, "category", 2];
//             const promise = getTreeFromDatabase({ client_id, kind, tree_id });

//             expect(promise).rejects.toThrowError(/kind.*informed/i);
//         });

//         it(`should reject with an Error if invalid tree_id`, async () => {
//             const [client_id, kind, tree_id] = [1, "category", 2];
//             const promise = getTreeFromDatabase({ client_id, kind, tree_id });

//             expect(promise).rejects.toThrowError(/tree_id.*informed/i);
//         });

//         it(`should reject with an Error something bad happens`, async () => {
//             connections.getClientConnection.mockImplementationOnce(() => {
//                 throw new Error();
//             });

//             const [client_id, kind, tree_id] = [1, "category", 2];
//             const promise = getTreeFromDatabase({ client_id, kind, tree_id });

//             expect(promise).rejects.toThrowError();
//         });
//     });

//     describe(`dealing with documents`, () => {
//         it(`document must have an _id`, done => {
//             const [client_id, kind, tree_id] = [1, "category", 2];
//             const promise = getTreeFromDatabase({ client_id, kind, tree_id });

//             promise.then(result => {
//                 expect(typeof result).toEqual("object");
//                 expect(result).toHaveProperty("_id", "sample");
//                 done();
//             });
//         });

//         it(`should resolve to null if not found`, () => {
//             mockingoose.Tree.toReturn(null, "findOne");

//             const [client_id, kind, tree_id] = [1, "category", 2];
//             const promise = getTreeFromDatabase({ client_id, kind, tree_id });

//             expect(promise).resolves.toBeNull();
//         });
//     });
// });
