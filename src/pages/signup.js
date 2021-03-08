import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import FirebaseContext from "../context/firebase";
import instagramLogo from "../images/logo.png";
import Header from "../components/header";

import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

export default function SignUp() {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // isInvalid variable is used to disable the form submit button when certain criteria on the inputs are not fulfilled
  const isInvalid =
    /\s/.test(userName) |
    (userName === "") |
    (fullName === "") |
    (emailAddress === "") |
    (password === "");

  // Handle when the Submit button is clicked on the Form
  const handleSignUp = async (event) => {
    event.preventDefault();

    // Call function to check Firestore for existence of username matching the one the user is providing
    const usernameExists = await doesUsernameExist(userName);
    if (!usernameExists.length) {
      try {
        // Create a new user in Firebase
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // Update the user's profile with new display Name
        await newUser.user.updateProfile({
          displayName: userName,
        });

        // Add the new user to firestore collection 'users'
        await firebase.firestore().collection("users").add({
          userId: newUser.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });

        // After successfully creating the user and updating the profile go to the dashboard
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setError(error.message);
      }
    } else {
      setUserName("");
      setFullName("");
      setEmailAddress("");
      setPassword("");
      setError("That username is already taken");
    }
  };

  // Set the page title
  useEffect(() => {
    document.title = "Signup - Instagram";
  }, []);

  return (
    <>
      <Header />
      <div className="container flex mx-auto max-w-xs items-center h-screen">
        <div className="flex flex-col">
          <div className="flex flex-col items-center bg-white p-4 border mb-4">
            <h1 className="flex justify-center w-full">
              <img
                src={instagramLogo}
                alt="Instagram"
                className="mt-2 w-6/12 mb-4"
              />
            </h1>
            {error && <p className="mb-4 text-xs text-red-500">{error}</p>}

            <form onSubmit={handleSignUp} method="POST">
              <input
                aria-label="Enter your User name"
                className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={({ target }) => {
                  if (/\s/.test(target.value)) {
                    setError("You cannot have blank spaces in your username");
                  } else {
                    if (
                      error === "You cannot have blank spaces in your username"
                    )
                      setError("");
                    setUserName(target.value.toLowerCase());
                  }
                }}
              />
              <input
                aria-label="Enter your Full nanme"
                className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                type="text"
                value={fullName}
                placeholder="Full name"
                onChange={({ target }) => setFullName(target.value)}
              />
              <input
                aria-label="Enter your email address"
                className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                type="text"
                value={emailAddress}
                placeholder="Email address"
                onChange={({ target }) =>
                  setEmailAddress(target.value.toLowerCase())
                }
              />
              <input
                aria-label="Enter your password"
                className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />

              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                  isInvalid && "cursor-not-allowed opacity-50"
                }`}
              >
                Sign Up
              </button>
            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
            <p className="text-sm">
              Have an account?{" "}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// max-w-screen-md = max-width: 768px
// max-auto = margin: auto
// h-screen = height: 100vh;
// items-center = align-items: center
