const { MongoClient } = require("mongodb");

export default async function contact(req, res) {
  if (req.method == "POST") {
    const { name, email, message } = req.body;

    const conditions =
      !email ||
      !email.includes("@") ||
      email.trim() === "" ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === "";

    if (conditions) {
      return res
        .status(422)
        .json({ status: "fail", message: "Invalid input." });
    }

    const newMessage = {
      name,
      message,
      email,
    };
    // MONGODB_LOCAL: "mongodb://localhost:27017/blog",
    // MONGODB_CLUSTER:
    const url = "mongodb://localhost:27017/blog";

    //MongoClient.connect()

    let client;
console.log(process.env.MONGODB_URL);

    try {
      client = await MongoClient.connect(process.env.MONGODB_URL);
      console.log("connected to db");
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: "something wrong with the connection.",
      });
    }

    // const client= await MongoClient.connect(
    //   "mongodb+srv://bidyutsikder420:bidyutkumar@cluster0.mbahdsf.mongodb.net/CRUD"
    // )

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      res.status(201).json({ status: "success", newMessage });
    } catch (error) {
      client.close();
      return res.status(500).json({
        status: "fail",
        message: "something wrong with the connection.",
      });
    }

    //res.status(201).json({ status: "success", result });
  }

  if (req.method == "GET") {
    res.json({ message: "get" });
  }
}
