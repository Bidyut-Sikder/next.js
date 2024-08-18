
import NextAuth from "next-auth";

import CredentialsProviders from "next-auth/providers/credentials";

import { connctToDatabase } from "../../../lib/db";
import { veifyPassword } from "../../../lib/auth";
export const authOptions = {
  session: {
    strategy: "jwt", // Or 'database' if using database sessions
  },
  secret: "proceafsafsadfsass.efsafnv.NEXffdsfsadfsafTAUTH_SECRET",
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
        //name,email,image are valid.
        return { email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};
export default NextAuth(authOptions);
