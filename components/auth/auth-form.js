import { useRef, useState } from "react";
import classes from "./auth-form.module.css";
// // import { signIn, signOut } from "next-auth/client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email, password) {
 
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();

  ///console.log(res);

  if (!res.ok) {
    throw new Error("something went wrong.");
  }

  return data;
}

function AuthForm() {
  const router = useRouter();
  const emailRef = useRef();
  const passRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();
   // console.log(router);
    
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: emailRef.current.value,
        password: passRef.current.value,
      });
      console.log(result);
      
      if (!result.error) {
        router.replace("/profile");
      }
    } else {
      try {
        const res = await createUser(
          emailRef.current.value,
          passRef.current.value
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passRef} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
