## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
# NextJS Login,Logout and protcting routes  authentication with next-auth.

## Topic1

## getSession() is a function which can be called from both server side and client side.But useSession() can not be called inside getServerSideProps().

### Protect pages from server side rendering using getSession() function inside getServerSideProps()

```
import {  getSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

export default ProfilePage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });


  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
      props: { name: "bidyut" },
    };
  }
  return {
    props: { session },
  };
}

```

## Topic2

### Protect pages from client side rendering using getSession() function inside useEffect(()=>{},[])

```
import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

function AuthPage() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      console.log(session);

      if (session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <AuthForm />;
}

export default AuthPage;

```

## Topic3

### Protect pages from client side rendering using useSession()

```
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function MainNavigation() {
 // const [data, setData] = useState(false);
 const { data, status } = useSession();
  <!-- getSession().then((session) => {
    if (session) {
      setData(true);
    }
  }); -->

///session data can be received in both ways.

  function logOutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          <li>{!data && <Link href="/auth">Login</Link>}</li>
          <li>{data && <Link href="/profile">Profile</Link>}</li>
          <li>{data && <button onClick={logOutHandler}>Logout</button>}</li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

```
# Next-Auth Configuration


```
api/auth/[...nextauth].js(file structure)

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

```
## Features Using context API

## Features Using mongodb

- **mongodb connection**:Get,Post request sending to mongodb ,and working with it's response.

## Note

- This is a basic example of how to use MongoDB in a Next.js project. we may need
  to modify the code to fit your specific use case.
