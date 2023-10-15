"use client";
import { FormEvent, useState } from "react";
import SignUp from "@/firebase/auth/SignUp";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await SignUp(email, password);

    if (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("A user with this email already exists.");
      } else {
        setErrorMsg(error.message);
      }
      return;
    }

    // If sign-up is successful, add user data to Firestore
    if (result && result.user) {
      const uid = result.user.uid;
      await addData(uid, {
        currentBalance: 0,
      });
    }

    return router.push("/dashboard");
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form onSubmit={handleForm} className="form">
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
