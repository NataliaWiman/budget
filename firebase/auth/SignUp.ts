import { auth } from "@/firebase";
import { UserCredential } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface SignUpResult {
  result: UserCredential | null;
  error: any | null;
}

const SignUp = async (
  email: string,
  password: string
): Promise<SignUpResult> => {
  let result: UserCredential | null = null;
  let error: any | null = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default SignUp;
