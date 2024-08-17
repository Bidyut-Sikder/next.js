import { getSession, useSession } from "next-auth/react";
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
