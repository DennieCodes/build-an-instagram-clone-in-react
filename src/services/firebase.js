import { firebase, FieldValue } from "../lib/firebase";

// doesUsernameExist function
// Checks the connected firestore database for username passed in and returns a non zero value is a match is found

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}
