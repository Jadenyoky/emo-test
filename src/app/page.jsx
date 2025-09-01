"use client";
import React, { useEffect, useRef, useState } from "react";
import questions from "../lib/questions";
import {
  handleCurrentUser,
  handleSignIn,
  handleSignOut,
  handleSignUp,
} from "../lib/auth";
import Loader from "../components/loader";

const Page = () => {
  const [password, setpassword] = useState("123456789");
  const [email, setemail] = useState("ahmed@yahoo.com");
  const [name, setname] = useState("Ahmed Jaden");

  const [currentUser, setCurrentUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([]);

  const withLoading = async (fn) => {
    setLoading(false);
    try {
      await fn();
    } finally {
      setLoading(true);
    }
  };

  const current = () => {
    handleCurrentUser(setCurrentUser, setLoading, setUserData);
  };

  useEffect(() => {
    current();
  }, []);

  return (
    <main className="">
      {/* <div className="flex flex-wrap gap-12 justify-center">
        {questions.items.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <div className="rounded-xl shadow-lg overfolow-hidden">
              <video
                onContextMenu={(e) => e.preventDefault()}
                src={item.video}
                className="aspect-square w-[200px] rounded-xl object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        ))}
      </div> */}

      {loading ? (
        currentUser?.uid ? (
          <div>
            <p>Email: {currentUser.email}</p>
            <p>verified: {currentUser.emailVerified ? "Yes" : "No"}</p>
            <button
              className="cursor-pointer"
              onClick={() => {
                withLoading(() => handleSignOut(current));
              }}
            >
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
            <div className="flex flex-col gap-4 w-full max-w-sm">
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
              <button
                className="cursor-pointer"
                onClick={() => {
                  withLoading(() => handleSignUp(email, password, current));
                }}
              >
                Sign Up
              </button>
            </div>
            <div className="flex flex-col gap-4 w-full max-w-sm">
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
              <button
                className="cursor-pointer"
                onClick={() => {
                  withLoading(() => handleSignIn(email, password, current));
                }}
              >
                Log In
              </button>
            </div>
          </>
        )
      ) : (
        <Loader />
      )}
    </main>
  );
};

export default Page;
