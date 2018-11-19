import MongoClient from "mongodb";

const url = process.env.MONGODB_URI;

export const saveClientCatalogItem = ({ clientKey, item }) => {
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

          const savedItem = trees.updateOne(
            { _id: new MongoClient.ObjectId(item._id) },
            { $set: (delete item._id, item) }
          );

          resolve(savedItem);
        }

        mongoClient.close();
      }
    );
  });
};
