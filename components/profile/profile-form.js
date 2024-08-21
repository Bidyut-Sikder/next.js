import { useRef } from "react";
import classes from "./profile-form.module.css";
import { useRouter } from "next/router";

function ProfileForm(props) {
  const router = useRouter();
  const newPass = useRef();
  const oldPass = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    const oldPassword = oldPass.current.value;
    const newPassword = newPass.current.value;
    console.log(oldPassword, newPassword);

    // props.onChangePassword({
    //   oldPassword,
    //   newPassword,
    // })

    const response = await fetch("/api/auth/user/change-password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });
    const resData = await response.json();
    // console.log(resData);

    if (resData.status === "success") {
      router.replace("/");
    }
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={newPass} type="password" id="new-password" />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input ref={oldPass} type="password" id="old-password" />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
