import { useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  // const { data, status } = useSession();

  // if (status === "loading") {
  //   return <p>Loading ...</p>;
  // }
  // if (!data) {
  //   window.location.href = "auth";
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
