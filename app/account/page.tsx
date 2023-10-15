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
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div>
        <p>Email: {user?.email}</p>
        <div>{user ? <SignOut /> : null}</div>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Your Name"
        />
        <button onClick={handleNameUpdate}>Update Name</button>
      </div>
    </main>
  );
}

export default AccountPage;
