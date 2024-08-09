import { useContext, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const notificationContext = useContext(NotificationContext);
  const { notification, showNotification, hideNotification } =
    notificationContext;

  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();

    // console.log(emailRef.current.value);
    showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: emailRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // res.json().then((err) => {
        //   console.log(err);
        //   return;

        //   // throw new Error(err.message || "something went wrong.");
        // });
        return res.json().then((err) => {
        throw new Error(err.message || "something went wrong.");
        });
      })
      .then((data) => {
        showNotification({
          title: "sucess",
          message: "successfully Registered for newsletter",
          status: "success",
        });
       // console.log(data);
      })
      .catch((err) => {
        showNotification({
          title: "error",
          message: "error  for Registering newsletter",
          status: "error",
        });
        //console.log(err);
      });
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={emailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
