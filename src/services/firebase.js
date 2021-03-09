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

// Challenge: Create an async function 'getUserByUserId'

// Acceptance Criteria
//   - A new service function for firebase that is called 'getUserByUserId'
//   - This function should query for a userId in the collection of users by the passed userId

export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}
