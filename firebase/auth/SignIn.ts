import { auth } from "@/firebase";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

interface SignInResult {
  result: UserCredential | null;
  error: any | null;
}

const SignIn = async (
  email: string,
  password: string
): Promise<SignInResult> => {
  let result: UserCredential | null = null;
  let error: any | null = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default SignIn;
