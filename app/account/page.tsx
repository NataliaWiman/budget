"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import SignOut from "@/components/SignOut";

function AccountPage() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ""
  );

  React.useEffect(() => {
    if (user == null) router.push("/signin");
  }, [user]);

  const handleNameUpdate = async () => {
    if (user) {
      await updateProfile(user, { displayName });
      // maybe show a success message or some feedback after updating
    }
  };

  return (
    <main className="flex flex-col mt-5 mx-auto p-5 w-[90%] bg-white rounded-2xl shadow-lg">
      <h1 className="mb-2 text-sm text-slate-500 text-center">Account</h1>
      {user?.displayName ? (
        <p className="text-lg">Name: {user?.displayName}</p>
      ) : null}
      <p className="text-lg">Email: {user?.email}</p>
      <p className="mt-5 mb-2">
        {user?.displayName ? "Change name" : "Provide name (optional)"}
      </p>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Your Name"
        className="py-2 px-3 bg-slate-100 rounded-lg"
      />
      <button
        onClick={handleNameUpdate}
        className="my-5 py-2 px-3 bg-orange-400 text-white rounded-lg"
      >
        Update Name
      </button>
      <div>{user ? <SignOut /> : null}</div>
    </main>
  );
}

export default AccountPage;
