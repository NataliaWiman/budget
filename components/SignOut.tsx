// components/SignOut.tsx
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

const SignOut: React.FC = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.push("/");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="py-2 px-3 bg-slate-400 text-white rounded-xl"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
