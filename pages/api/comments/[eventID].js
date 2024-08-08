import { getEventById } from "../../../helpers/api-util";
import {
  connectDatabase,
  getDocuments,
  insertDocument,
} from "../../../helpers/db-util";

export default async function handler(req, res) {
  const eventID = req.query.eventID;

  let client;

  try {
    client = await connectDatabase();
    //console.log("Connected successfully to server");
  } catch (error) {
    res.status(500).json({ status: "fail", message: "connection failed." });
    return;
  }

  if (req.method === "GET") {
    try {
      const comments = await getDocuments(
        client,
        "comments",
        { eventId: eventID },
        { _id: -1 }
      );
      res.json({ status: "success", data: comments, len: comments.length });
    } catch (error) {
      res
        .status(400)
        .json({ status: "fail", message: "something went wrong." });
    }
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !name.trim() === "" ||
      !text.trim() === "" ||
      !email ||
      !email.includes("@")
    ) {
      res.status(422).json({ message: "Invalid Input." });

      client.close();
      return;
    }

    const newComment = {
      eventId: eventID,
      name,
      email,
      text,
    };

    // await client.connect(); //connected
    // console.log("Connected successfully to server");

    // const db = client.db();
    // const result = await db.collection("comments").insertOne(newComment);
    // // console.log(result);

    // // .then((res) => {
    // //   console.log(res);
    // // })
    // // .catch((err) => {
    // //   console.log(err);
    // // });
    try {
      await insertDocument(client, "comments", newComment);
      client.close();
    } catch (error) {
      res
        .status(500)
        .json({ status: "fail", message: " failed to insert data." });
      return;
    }

    res.status(201).json({ status: "success", data: newComment });
  }
}
