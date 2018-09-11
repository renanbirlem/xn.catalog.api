import MongoClient from "mongodb";

const url =
  "mongodb://admin:IMMEAVLOYUOZSCIE@portal-ssl382-34.bmix-dal-yp-6c0f6062-a8db-421d-af87-9f3b5d816259.1618611940.composedb.com:56026,portal-ssl386-33.bmix-dal-yp-6c0f6062-a8db-421d-af87-9f3b5d816259.1618611940.composedb.com:56026/compose?authSource=admin&ssl=true";

export const loadClientCatalog = ({ client }) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      (error, mongoClient) => {
        if (error !== null) {
          reject(error);
        } else {
          const db = mongoClient.db(client);

          const trees = db.collection("trees");

          trees.find({}, { limit: 100 }).toArray((error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        }

        mongoClient.close();
      }
    );
  });
};
