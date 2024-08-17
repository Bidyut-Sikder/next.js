import Link from "next/link";

import classes from "./main-navigation.module.css";
import { getSession, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function MainNavigation() {
  const [data, setData] = useState(false);
  // const { data, status } = useSession();
  getSession().then((session) => {
    if (session) {
      setData(true);
    }
  });

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
