import React, { useEffect, useState } from "react";
import classes from "./contac-form.module.css";
import Notification from "../ui/notification";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", message: "", email: "" });
  const [status, setStatus] = useState(null);

  function onChangeHandler(key, value) {
    setForm((pre) => ({
      ...pre,
      [key]: value,
    }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    setStatus("pending");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    //const resData = await response.json();

    if (!response.ok) {
      setStatus("error");
      // throw new Error("Something went wrong.");
    } else {
      setStatus("success");
      setForm({ name: "", message: "", email: "" });
    }
  }

  let notification;
  if (status === "pending") {
    notification = {
      status: "sending",
      message: "Your message is on its way",
      title: "Sending Message...",
    };
  }
  if (status === "success") {
    notification = {
      status: "success",
      message: "Your message has been sent successfully",
      title: "Success",
    };
  }
  if (status === "error") {
    notification = {
      status: "error",
      message: "Something bad happened.",
      title: "Error",
    };
  }

  useEffect(() => {
    if (status === "success" || status === "error") {
      let id = setTimeout(() => {
        setStatus(null);
      }, 3000);
      return () => clearTimeout(id);
    }
    // return () => {
    //   clearTimeout(id);
    // };
  }, [status]);

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={onSubmitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label for="email">Email:</label>
            <input
              value={form.email}
              onChange={(e) => onChangeHandler("email", e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div className={classes.control}>
            <label for="name">Name:</label>

            <input
              value={form.name}
              onChange={(e) => onChangeHandler("name", e.target.value)}
              type="text"
              id="name"
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label for="message">Message:</label>
          <textarea
            value={form.message}
            onChange={(e) => onChangeHandler("message", e.target.value)}
            id="message"
            rows="5"
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          message={notification.message}
          title={notification.title}
          status={notification.status}
        />
      )}
    </section>
  );
}
