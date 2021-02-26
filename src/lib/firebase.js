import { seedDatabase } from "../seed";

// Utilizes dotenv to retrieve relevant keys from environmental variables
require("dotenv").config();

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE,
  REACT_APP_FIREBASE_SENDER_ID,
  REACT_APP_FIREBASE_APP_ID,
} = process.env;

const config = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

// Initialize and export firebase
// const firebaseApp = firebase.initializeApp(config);
// const { FieldValue } = firebaseApp.firestore();

const firebase = window.firebase.initializeApp(config);
const { FieldValue } = firebase.firestore;

// console.log(`Field Value: ${FieldValue}`);

// NOTE: After running once, remove or comment out the following command
seedDatabase(firebase);

export { firebase, FieldValue };
