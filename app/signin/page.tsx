"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import SignIn from "@/components/SignIn";

function SignInPage() {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      // If the user is signed in, redirect to /dashboard
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {user === undefined ? "Loading..." : !user && <SignIn />}
    </main>
  );
}

export default SignInPage;
