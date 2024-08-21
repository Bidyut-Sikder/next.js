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
