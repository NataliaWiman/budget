"use client";
import { FormEvent, useState } from "react";
import SignUp from "@/firebase/auth/SignUp";
import { useRouter } from "next/navigation";
import addData from "@/firebase/firestore/addData";
import Link from "next/link";

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
    <div className="flex flex-col mt-10 mx-auto p-5 w-[90%] bg-white rounded-2xl shadow-lg">
      <h1 className="mb-5 text-xl">Sign up</h1>
      <form onSubmit={handleForm} className="form flex flex-col">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          name="email"
          id="email"
          placeholder="example@mail.com"
          className="mb-3 py-2 px-3 bg-slate-100 rounded-lg"
        />

        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          name="password"
          id="password"
          placeholder="password"
          className="py-2 px-3 bg-slate-100 rounded-lg"
        />

        <button
          type="submit"
          className="my-5 py-2 px-3 bg-orange-400 text-white rounded-lg"
        >
          Sign up
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
