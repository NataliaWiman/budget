"use client";
import { FormEvent, useState } from "react";
import SignIn from "@/firebase/auth/SignIn";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { result, error } = await SignIn(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/dashboard");
  };
  return (
    <div className="flex flex-col mt-10 mx-auto p-5 w-[90%] bg-white rounded-2xl shadow-lg">
      <h1 className="mb-5 text-xl">Sign in</h1>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="underline">
          Create one now
        </Link>
      </p>
      <form onSubmit={handleForm} className="form mt-5 flex flex-col">
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
          className="mb-3 py-2 px-3 bg-slate-100 rounded-lg"
        />

        {/* <label htmlFor="remember">
          <input type="checkbox" name="remember" id="remember" /> Remember me
        </label> */}
        <button
          type="submit"
          className="my-5 py-2 px-3 bg-orange-400 text-white rounded-lg"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default Page;
