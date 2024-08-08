
import { connectDatabase, insertDocument } from "../../helpers/db-util";



export default async function handler(req, res) {
  // mongoose.connect('mongodb://localhost:27017/FinalProject')
  // //mongoose.connect("mongodb+srv://bidyutsikder420:bidyutkumar@cluster0.mbahdsf.mongodb.net/CRUD")
  // .then(() => {
  //   console.log('connected to db')
  // })
  // .catch((e) => {
  //   console.log(e)
  // })
  ////////////////////////////////////////////


  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ error: "Invalid email address" });
      return;
    }


    let client;
    try {
      client = await connectDatabase();
      //console.log("Connected successfully to server");
    } catch (error) {
      res.status(500).json({ status: "fail", message: "connection failed." });
      return;
    }


    try {
      await insertDocument(client,"emails",{ email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ status: "fail", message: " failed to insert data." });
      return;
    }

    res.status(201).json({ message: "signed up successfully." });
  }
}
