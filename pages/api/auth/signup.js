import { hashPassword } from "../../../lib/auth";
import { connctToDatabase } from "../../../lib/db";

const signupHandler = async (req, res) => {
  const { email, password } = req.body;

  if (req.method === "POST") {
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      return res
        .status(422)
        .json({ status: "fail", message: "Invalid password." });
    }

    const client = await connctToDatabase();
    const db = client.db();

    const exitingUser = await db.collection("users").findOne({ email: email });
    if (exitingUser) {
      res
        .status(422)
        .json({ status: "success", message: "User exists already." });

      client.close();
      return;
    } else {
      
    }

    const result = await db.collection("users").insertOne({
      email,
      password: await hashPassword(password),
    });

    res.status(201).json({
      status: "success",
      hash: result,
      message: "created succesfully.",
    });
    client.close();
    return;
  }
};

export default signupHandler;
