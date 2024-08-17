import { MongoClient } from "mongodb";

export async function connctToDatabase() {
  const client = await MongoClient.connect("mongodb://localhost:27017/auth");

  return client;
}



















