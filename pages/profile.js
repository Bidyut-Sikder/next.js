// import { getSession, useSession } from "next-auth/react";
import UserProfile from "../components/profile/user-profile";

import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

function ProfilePage() {
  return <UserProfile />;
}

export default ProfilePage;

export async function getServerSideProps(context) {
  
  // const session = await getSession({ req: context.re,res:context.res,authOptions });
  // const session = await getServerSession({
  //   req: context.re,
  //   res: context.res,
  //   authOptions,
  // });

  //console.log(session);
  const session = await getServerSession(context.req, context.res, authOptions)
  
  //console.log(session);
  
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
