// import { seedDatabase } from "../seed";

import firebaseApp from "firebase";

// Utilizes dotenv to retrieve relevant keys from environmental variables
require("dotenv").config();

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_SENDER_ID,
  FIREBASE_STORAGE,
  FIREBASE_APP_ID,
} = process.env;

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Initialize and export firebase
const firebase = firebaseApp.initializeApp(config);
const { FieldValue } = firebaseApp.firestore;

export { firebase, FieldValue };
