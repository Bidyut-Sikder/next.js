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

  // async function onChangePasswordHandler(paswordData) {
  //   // console.log(paswordData);
  //   const response = await fetch("/api/auth/user/change-password", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(paswordData),
  //   });
  //   const data = await response.json();
  //  if (data.status==='success') {
    
  //  }
  // }
 
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm  />
    </section>
  );
}

export default UserProfile;
