// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";
import { connctToDatabase } from "../../../../lib/db";
import { hashPassword, veifyPassword } from "../../../../lib/auth";
import { authOptions } from "../[...nextauth]";

import { getServerSession } from "next-auth/next";

// export default async function handler(req, res) {
//   const session = await getServerSession(req,res, authOptions)

//   console.log(session);

//   if (!session) {
//     res.status(401).json({ message: "You must be logged in." })
//     return
//   }

//   return res.json({
//     message: "Success",
//   })
// }

async function userHandler(req, res) {
  if (req.method !== "PATCH") {
    return res.json({ status: "fail", message: "Method not allowed" });
  }

  //const session = await getSession({ req: req });
  const session = await getServerSession(req, res, authOptions);
  //    const session = await getServerSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ status: "fail", message: "You must be logged in" });
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  console.log(userEmail, newPassword, oldPassword);

  const client = await connctToDatabase();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ status: "fail", message: "User not found" });
    client.close();

    return;
  }

  const currentPassword = user.password;

  const isValidPassword = await veifyPassword(oldPassword, currentPassword);

  if (!isValidPassword) {
    res.status(422).json({ status: "fail", message: "Invalid password" });
    client.close();
    return;
  }

  const newHashPassword = await hashPassword(newPassword);

  console.log(userEmail);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashPassword } }
  );
  // console.log(result);

  client.close();
  res.status(201).json({ status: "success", message: "Password updated" });

  return;
}
export default userHandler;
