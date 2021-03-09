import React, { useContext } from "react";
import { Link } from "react-router-dom";

import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";

import instagramLogo from "../images/logo.png";
import * as ROUTES from "../constants/routes";

import testuser from "../images/avatars/testuser.jpg";

export default function Header() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  // console.log(`Current user is: ${user.userName}`);

  // Check for a authorized, logged in user and offer different button options depending on user status
  let buttonOptions = "";
  // const user = firebase.auth().onAuthStateChanged((user) => user);

  // const user = firebase.auth().currentUser;
  // Function handles when the Logout button is clicked
  const handleLogout = async () => {
    await firebase.auth().signOut();
    console.log("User was signed out");
  };

  if (user) {
    buttonOptions = (
      <>
        <Link to={ROUTES.DASHBOARD} aria-label="Home">
          <svg
            className="w-8 mr-6 text-black-light cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            title="Home"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>

        <button onClick={handleLogout} type="button">
          <svg
            className="w-8 mr-6 text-black-light cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>

        <div className="flex items-center cursor-pointer">
          <Link to={`/p/${user.displayName}`}>
            <img
              className="rounded-full h-8 w-8 flex"
              src={testuser}
              alt={`${user.displayName} profile picture`}
            />
          </Link>
        </div>
      </>
    );
  } else {
    buttonOptions = (
      <>
        <Link to={ROUTES.LOGIN} aria-label="Login">
          <button
            className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8"
            type="button"
          >
            Login
          </button>
        </Link>
        <Link to={ROUTES.SIGN_UP} aria-label="Sign Up">
          <button
            className="font-bold text-sm rounded text-blue w-20 h-8"
            type="button"
          >
            Sign Up
          </button>
        </Link>
      </>
    );
  }

  return (
    <header className="h-16 bg-white border-b mb-8">
      <div className="container mx-auto max-width-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
              <h1>
                <img
                  className="mt-2 w-6/12"
                  src={instagramLogo}
                  alt="Instagram"
                />
              </h1>
            </Link>
          </div>
          <div className="text-gray text-center flex items-center align-items space-x-4">
            {buttonOptions}
          </div>
        </div>
      </div>
    </header>
  );
}
