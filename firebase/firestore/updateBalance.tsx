import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import dayjs from "dayjs";

export default async function updateBalance(
  userId: string,
  newBalance: number
) {
  const userDoc = doc(db, "users", userId);
  let result = null;
  let error = null;

  const today = dayjs().startOf("day"); // Using dayjs for consistent date handling
  const lastUpdatedDate = today.toISOString();

  try {
    // Fetch the existing user data
    const userData = await getDoc(userDoc);

    if (userData.exists()) {
      const {
        firstSalaryOfTheMonth = newBalance, // Default to newBalance if undefined
        lastUpdatedDate: lastDate,
      } = userData.data() as any;

      // Parse the last updated date
      const lastUpdated = dayjs(lastDate).startOf("day");

      // Check if it's a new "salary month"
      const isNewSalaryMonth =
        today.date() >= 25 && lastUpdated.month() !== today.month();

      // Conditionally update the firstSalaryOfTheMonth
      const newFirstSalaryOfTheMonth = isNewSalaryMonth
        ? newBalance
        : firstSalaryOfTheMonth;

      await updateDoc(userDoc, {
        currentBalance: newBalance,
        lastUpdatedBalance: firstSalaryOfTheMonth,
        lastUpdatedDate,
        firstSalaryOfTheMonth: newFirstSalaryOfTheMonth,
      });

      result = "Success";
    } else {
      error = "User not found.";
    }
  } catch (e) {
    console.error("Error updating document: ", e);
    error = e;
  }

  return { result, error };
}
