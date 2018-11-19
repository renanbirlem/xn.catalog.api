import MongoClient from "mongodb";

const url = process.env.MONGODB_URI;

export const loadClientCatalog = ({ clientKey }) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      { useNewUrlParser: true },
      (error, mongoClient) => {
        if (error !== null) {
          reject(error);
        } else {
          const db = mongoClient.db(clientKey);

          const trees = db.collection("trees");

          trees.find({}).toArray((error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(
                result.map(document => {
                  delete document.visible_items;
                  return document;
                })
              );
            }

            mongoClient.close();
          });
        }
      }
    );
  });
};
