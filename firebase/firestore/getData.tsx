import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getDoument(collection: string, userId: string) {
  let docRef = doc(db, collection, userId);

  let result = null;
  let error = null;

  try {
    result = await getDoc(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
