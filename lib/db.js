import { MongoClient } from "mongodb";

export async function connctToDatabase() {
  const url = "mongodb://localhost:27017";
  const url2 =
    "mongodb+srv://bidyutsikder420:bidyutkumar@cluster0.mbahdsf.mongodb.net/nextAuth";
  const client = await MongoClient.connect(url2);

  return client;
}
