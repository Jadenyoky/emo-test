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
        <div className="flex justify-between gap-4">
          <button className="flex-1 text-xl text-nowrap cursor-pointer border border-[var(--teal)] rounded-full px-4 py-2 text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition">
            Sign up
          </button>
          <button className="flex-1 text-xl text-nowrap cursor-pointer border border-[var(--teal)] rounded-full px-4 py-2 text-[var(--teal)] hover:bg-[var(--teal)] hover:text-white transition">
            Login
          </button>
        </div>
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
