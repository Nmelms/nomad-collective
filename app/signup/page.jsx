"use client";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useUserStore from "../useUserStore";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [userName, setUserName] = useState("");
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          userName,
        },
      },
    });
    if (res.error) {
      let error = res.error.message;
      console.log(error);
      // if (error === "User already registered") {
      //   loginAlert.classList.remove("hidden");
      //   loginAlert.innerHTML = `<p> User Already Exists, Try signin in </p>`;
      // }
      // if (error === "Password should be at least 6 characters.") {
      //   loginAlert.classList.remove("hidden");
      //   loginAlert.innerHTML = `<p> Password should be at least 6 characters. </p>`;
      // }
    } else {
      setUser(res.data.user);
      router.push("/");
    }
  };
  return (
    <div className="signup-page p-4">
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="userName">
          <Form.Control
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            value={userName}
            placeholder="Username"
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
      <Button variant="primary ms-2" onClick={handleSignUp} type="submit">
        Sign Up!
      </Button>
    </div>
  );
};

export default SignupPage;
