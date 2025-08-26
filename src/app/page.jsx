"use client";
import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const Page = () => {
  const [email, setemail] = useState("jaden_yoky@yahoo.com");
  const [password, setpassword] = useState("123456789");
  const [name, setname] = useState("Ahmed Jaden");

  const [currentUser, setcurrentUser] = useState([]);
  const [loading, setloading] = useState(false);

  const [userData, setuserData] = useState([]);

  const handleUserData = async (user) => {
    try {
      const addNewUser = await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        name: user.displayName,
        sleep: "yes",
        events: {
          score: 50,
          question: 3,
        },
      });
    } catch (error) {
      console.log("user error handle user data", error);
    }
  };

  const handleUserData2 = async (user) => {
    try {
      const addNewUser = await setDoc(
        doc(db, "users", user.uid),
        {
          nice: "hello",
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.log("user error handle user data", error);
    }
  };

  const handleGetData = async (user) => {
    try {
      const userData = await getDoc(doc(db, "users", user.uid));
      console.log("user data", userData.data());
      setuserData(userData.data());
    } catch (error) {
      console.log("user error get user data", error);
    }
  };

  const handleCurrentUser = () => {
    const userState = onAuthStateChanged(auth, (user) => {
      console.log("user state changed", user);
      setcurrentUser(user);

      if (user) {
        handleUserData(user);
        handleGetData(user);
      }

      setloading(true);
    });
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const handleSignUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setloading(false);

      console.log("user sign up", user);

      await updateProfile(user, {
        displayName: name,
      });

      console.log("user update profile", user);

      await sendEmailVerification(user);

      console.log("user send email verification", user);

      handleCurrentUser();
      console.log(auth.currentUser);

      setloading(true);
    } catch (error) {
      console.log("user error sign up ", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("user sign in", user);
      handleCurrentUser();
    } catch (error) {
      console.log("user error sign in ", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(user);
      console.log("user resend email verification", user);
    } catch (error) {
      console.log("errrrr", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("user sign out", auth.currentUser);
      setcurrentUser([]);
    } catch (err) {
      console.log("user error sign out", err);
    }
  };

  return (
    <main className="flex flex-col gap-[100px] justify-center items-center h-[auto] w-[500px] container shadow-2xl border p-[50px]">
      <h1>Hello World!</h1>

      {loading ? (
        currentUser?.uid ? (
          <div>
            <button
              onClick={() => {
                handleUserData2(currentUser);
              }}
            >
              test merge
            </button>
            <p>Display Name: {currentUser.displayName}</p>
            <p>Email: {currentUser.email}</p>
            <p>verified: {currentUser.emailVerified ? "Yes" : "No"}</p>
            <button onClick={handleSignOut} className="cursor-pointer">
              Sign Out
            </button>

            {userData?.email && (
              <div>
                <p>Nice: {userData.email}</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
                placeholder="Name"
              />
              <button onClick={handleSignUp} className="cursor-pointer">
                Sign Up
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
              />
              <button onClick={handleSignIn} className="cursor-pointer">
                Sign In
              </button>
              <button
                onClick={handleResendVerification}
                className="cursor-pointer"
              >
                Resend link
              </button>
            </div>
          </>
        )
      ) : (
        <div>loading ....</div>
      )}
    </main>
  );
};

export default Page;
