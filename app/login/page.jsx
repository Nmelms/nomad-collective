"use client";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import useUserStore from "../useUserStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserStore();
  // const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();
  // let loginAlert = document.querySelector(".login-alert");

  useEffect(() => {
    async function getUser() {
      const res = await supabase.auth.getUser();

      setUser(res.data.user);
    }

    getUser();
  }, []);

  const handleSignUp = async () => {
    router.push("/signup");
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error) {
      loginAlert.classList.remove("hidden");
      loginAlert.innerHTML = `<p> UserName or Password Incorrect </p>`;
    } else {
      setUser(res.data.user);
      router.push("/");
    }
  };

  return (
    <div className="login-page">
      <div className=" login-form-wrapper d-flex flex-column ">
        <div className="login-alert hidden"></div>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
        </Form>
        <div className="d-flex">
          <Button variant="primary me-2" onClick={handleSignUp} type="submit">
            sign Up
          </Button>
          <Button variant="primary ms-2" onClick={handleSignIn} type="submit">
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
