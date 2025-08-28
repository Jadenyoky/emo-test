"use client";
import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import questions from "../lib/questions";

const Page = () => {
  const [email, setemail] = useState("ahmed@yahoo.com");
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
        createdAt: serverTimestamp(),
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
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (doc.exists()) {
          console.log("current data", doc.data());
          setuserData(doc.data());
        }
        return () => unsub();
      });
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
    return () => userState();
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

      await updateProfile(user, {
        displayName: name,
      });

      await sendEmailVerification(user);

      handleCurrentUser();

      setloading(true);
    } catch (error) {
      console.log("user error sign up ", error);
    }
  };

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      handleCurrentUser();
    } catch (error) {
      console.log("user error sign in ", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(user);
    } catch (error) {
      console.log("errrrr", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log("user error sign out", err);
    }
  };

  const inputRef = useRef(null);
  const updateData = async (user) => {
    try {
      const update = await setDoc(
        doc(db, "users", user.uid),
        {
          name: inputRef.current.value,
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.log("user error handle user data", error);
    }
  };

  return (
    <main className="flex flex-col gap-[100px] justify-center items-center h-[auto] w-[500px] container shadow-2xl border p-[50px]">
      <h1>Hello World!</h1>

      <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600">
        Click me
      </button>
      <div>
        {questions.question}
        {questions.items.map((item) => (
          <div key={item.id}>
            <video src={item.video} controls />
            <p>{item.question}</p>
            <ul>
              {item.options.map((option) => (
                <li key={option}>{option}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {loading ? (
        currentUser?.uid ? (
          <div>
            <input ref={inputRef} type="text" placeholder="New Name" />
            <button
              onClick={() => {
                updateData(currentUser);
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
                <p>Nice: {userData.name}</p>
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
