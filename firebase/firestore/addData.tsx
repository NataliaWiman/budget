import { Budget, BudgetItem, User } from "@/types";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async function addData(userId: string, data: Budget) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, "users", userId), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}
