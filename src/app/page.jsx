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
import { Button } from "../components/elements";

const Page = () => {
  const [password, setpassword] = useState("123456789");
  const [email, setemail] = useState("ahmed@yahoo.com");
  const [name, setname] = useState("Ahmed Jaden");

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState([]);

  const withLoading = async (fn) => {
    setLoading(false);
    try {
      await fn();
      current();
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

  const handleNavigateToTest = () => {
    console.log("Navigating to test...");
  };
  const handleNavigateToLogin = () => {
    console.log("Navigating to login...");
  };

  return (
    <main className="min-h-svh grid grid-cols-2 max-md:grid-cols-1 gap-8 max-md:gap-0 items-center justify-center place-items-center">
      <div className="flex flex-col gap-16 h-[50vh] max-md:h-[auto] justify-evenly max-md:justify-center max-md:w-[80%]">
        <div className="flex flex-col capitalize gap-4  items-center">
          <div className="relative w-fit ">
            <div className="rounded-2xl h-[50%] w-[50px] absolute bottom-0 right-0 bg-[var(--gold)] z-[-1] rotate-2" />
            <h1 className=" text-3xl max-md:text-xl font-semibold text-[var(--red)] text-center">
              Welcome to
            </h1>
          </div>
          <div className="relative w-fit">
            <div className="rounded-2xl h-[50%] w-[150px] absolute bottom-0 left-0 bg-[var(--gold)] z-[-1] -rotate-2" />
            <h1 className="text-5xl max-md:text-3xl font-bold text-[var(--sky)]">
              Emo Test App
            </h1>
          </div>
        </div>

        {loading ? (
          currentUser ? (
            <div className="flex flex-wrap justify-between gap-4 items-center">
              <div className="flex-1">
                <Button
                  title={"Start Test"}
                  color1={"var(--gold)"}
                  color2={"var(--teal)"}
                  onClick={() => {
                    handleNavigateToTest();
                  }}
                />
              </div>

              <div className="flex-1">
                <Button
                  title={"Logout"}
                  color1={"var(--sky)"}
                  color2={"var(--red)"}
                  onClick={() => {
                    withLoading(handleSignOut);
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-between gap-4 items-center">
              <div className="flex-1">
                <Button
                  title={"Sign up"}
                  color1={"var(--purple)"}
                  color2={"var(--teal)"}
                  onClick={() => {
                    handleNavigateToTest();
                  }}
                />
              </div>

              <div className="flex-1">
                <Button
                  title={"Login"}
                  color1={"var(--sky)"}
                  color2={"var(--teal)"}
                  onClick={() => {
                    handleNavigateToLogin();
                  }}
                />
              </div>
            </div>
          )
        ) : (
          <Loader />
        )}
      </div>

      <img
        className="max-md:w-[500px] object-cover "
        src="/pics/hero.jpg"
        alt=""
      />
    </main>
  );
};

export default Page;
