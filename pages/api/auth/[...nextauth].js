// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";

// import CredentialsProvider from "next-auth/providers/credentials";

// import { connctToDatabase } from "../../../lib/db";
// import { veifyPassword } from "../../../lib/auth";

// const users = [
//   {
//     id: 1,
//     name: "bidyut",
//     email: "bidyutsikder420@gmail.com",
//     password: "1234",
//   },
//   { id: 2, name: "Jane", email: "jane@gmail.com", password: "1234" },
//   { id: 3, name: "Bob", email: "bob@gmail.com", password: "1234" },
// ];

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "email", placeholder: "enter email" },
//         password: { label: "password", placeholder: "password" },
//       },
//       async authorize(credentials) {
//         console.log(credentials);

//         // if (!credentials || !credentials.email || !credentials.password) {
//         //   return null;
//         // }

//         // const user = users.find((item) => item.email === credentials.email);

//         // if (user?.password === credentials.password) {
//         //   return user;
//         // }

//         const client = await connctToDatabase();

//         const userCollection = client.db().collection("users");
//         const user = await userCollection.findOne({ email: credentials.email });

//         if (!user) {
//           throw new Error("no user found.");
//         }

//         const isValid = await veifyPassword(
//           credentials.password,
//           user.password
//         );

//         if (!isValid) {
//           throw new Error("could not log you in ");
//         }

//         client.close();
//         return { email: user.email };

//         return null;
//       },
//     }),
//   ],
//   secret: "bidyutsikder123432",
// };
// export default NextAuth(authOptions);

//////////////////////////////////////////

import NextAuth from "next-auth";

import CredentialsProviders from "next-auth/providers/credentials";

import { connctToDatabase } from "../../../lib/db";
import { veifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProviders({
      name: "credentials",
      async authorize(credentials, req) {
        //  console.log(req);

        const client = await connctToDatabase();

        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({ email: credentials.email });

        if (!user) {
          client.close();
          throw new Error("no user found.");
        }

        const isValid = await veifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("could not log you in ");
        }

        client.close();
        return { email: user.email, message: "this from [...nextauth]" };
      },
    }),
  ],
  callbacks: {
    async session(session, token) {
  

      // Add custom properties to the session object
      session.session.user.name = "bidyut";
      // session.user.role = token.role; // Assuming role is part of the token
      return session;
    },
  },
});
