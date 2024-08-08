export async function connectDatabase() {
  const { MongoClient } = require("mongodb");

  const url = "mongodb://localhost:27017/newsletter";
  const client = new MongoClient(url);
  return await client.connect(); //connected
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  return await db
    .collection(collection)
    .insertOne(document)

    .then((res) => {
      //console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getDocuments(client, collection, searchParams, sorting) {
  const db = client.db();
  const comments = await db
    .collection(collection)
    .find(searchParams)
    .sort(sorting)
    .toArray();

   
  client.close();
  return comments;
}
