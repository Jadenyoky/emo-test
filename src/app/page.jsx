"use client";
import React, { useEffect, useState } from "react";
import { handleCurrentUser, handleSignOut } from "../lib/auth";
import Loader from "../components/loader";
import { Button } from "../components/elements";
import { useRouter } from "next/navigation";

const Page = () => {
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

  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };

  return (
    <main className="min-h-svh grid grid-cols-2 max-md:grid-cols-1 gap-8 max-md:gap-0 items-center justify-center place-items-center">
      <div className="flex flex-col gap-16 max-md:gap-8 h-[50vh] max-md:h-[auto] justify-evenly max-md:justify-center max-md:w-[80%]">
        <div className="flex flex-col capitalize gap-4 items-center max-md:pt-5">
          <div className="relative w-fit ">
            <div className="rounded-2xl h-[50%] w-[50px] absolute bottom-0 right-0 bg-[var(--gold)] z-[-1] rotate-2 opacity-50" />
            <h1 className=" text-3xl max-md:text-xl font-semibold text-[var(--red)] text-center">
              Welcome to
            </h1>
          </div>
          <div className="relative w-fit">
            <div className="rounded-2xl h-[50%] w-[150px] absolute bottom-0 left-0 bg-[var(--gold)] z-[-1] -rotate-2 opacity-50" />
            <h1 className="text-5xl max-md:text-3xl font-bold text-[var(--sky)]">
              Emo Test App
            </h1>
          </div>
        </div>

        {loading ? (
          currentUser ? (
            <div className="flex flex-col justify-between gap-8 items-center">
              <div className="flex justify-between flex-wrap w-full gap-4 px-2">
                <div className="relative flex flex-col gap-1">
                  <div className="rounded-2xl h-[50%] w-[50px] absolute bottom-0 right-0 bg-[var(--gold)] z-[-1] rotate-2 opacity-50" />
                  <p className="text-sm text-[var(--teal)]">Hello ,</p>
                  <p className="font-semibold text-2xl text-[var(--teal)]">
                    {currentUser?.displayName}
                  </p>
                </div>
                <div className="relative flex flex-col gap-1">
                  <div className="rounded-2xl h-[50%] w-[50px] absolute bottom-0 right-0 bg-[var(--gold)] z-[-1] rotate-2 opacity-50" />
                  <p className="text-sm text-[var(--red)]">Score ,</p>
                  <p className="font-semibold text-2xl font-[Space_Grotesk] text-[var(--red)]">
                    {userData?.events?.score}
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-wrap justify-between gap-4 items-center">
                <div className="flex-1">
                  <Button
                    title={"Start Test"}
                    color1={"var(--gold)"}
                    color2={"var(--teal)"}
                    onClick={() => {
                      handleNavigate("/test");
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
            </div>
          ) : (
            <div className="flex flex-wrap justify-between gap-4 items-center">
              <div className="flex-1">
                <Button
                  title={"Sign up"}
                  color1={"var(--purple)"}
                  color2={"var(--teal)"}
                  onClick={() => {
                    handleNavigate("/signup");
                  }}
                />
              </div>

              <div className="flex-1">
                <Button
                  // title={"Login"}
                  // color1={"var(--sky)"}
                  // color2={"var(--teal)"}
                  title={"Login"}
                  color1={"var(--gold)"}
                  color2={"var(--red)"}
                  onClick={() => {
                    handleNavigate("/login");
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
        className="max-md:w-[400px] object-cover "
        src="/pics/hero.jpg"
        alt=""
      />
    </main>
  );
};

export default Page;
