"use client";
import React, { useEffect, useState } from "react";
import { handleSignOut } from "../lib/auth";
import Loader from "../components/loader";
import { Button } from "../components/elements";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";

const Page = () => {
  const { user, loading } = useAuth();
  const { quizData, quizLoading } = useQuiz();
  useEffect(() => {
    console.log(quizData);
  }, []);

  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };

  return (
    <main className="min-h-svh grid grid-cols-2 max-md:grid-cols-1 gap-8 max-md:gap-0 items-center justify-center place-items-center">
      <div className="max-md:pt-8 flex flex-col gap-16 max-md:gap-8 h-[50vh] max-md:h-full justify-evenly max-md:justify-between max-md:w-[80%] ">
        <div className="flex flex-col capitalize gap-4 items-center ">
          <div className="relative w-fit ">
            <div className="rounded-2xl h-[50%] w-[50px] absolute bottom-0 right-0 bg-[var(--gold)] z-[-1] rotate-2 opacity-50" />
            <h1 className=" text-3xl max-md:text-xl font-semibold text-[var(--red)] text-center capitalize">
              welcome to
            </h1>
          </div>
          <div className="relative w-fit">
            <div className="rounded-2xl h-[50%] w-[150px] absolute bottom-0 left-0 bg-[var(--gold)] z-[-1] -rotate-2 opacity-50" />
            <h1 className=" capitalize text-5xl max-md:text-3xl font-bold text-[var(--sky)]">
              emo quiz app
            </h1>
          </div>
        </div>

        {loading ? (
          user ? (
            <div className="max-md:h-full flex flex-col justify-center gap-8 items-center">
              <div className="flex justify-between flex-wrap w-full gap-4 px-2 ">
                {quizLoading ? (
                  <div className="relative flex flex-col gap-1 ">
                    <div className="rounded-2xl h-[50%] w-[50px] absolute bottom-0 right-0 bg-[var(--gold)] z-[-1] rotate-2 opacity-50" />
                    <p className="text-sm text-[var(--teal)] font-[Unbounded]">
                      Hello ,
                    </p>
                    <p className="font-semibold text-2xl text-[var(--teal)] text-center">
                      {user?.displayName}
                    </p>
                  </div>
                ) : (
                  <Loader />
                )}
                {quizLoading ? (
                  <div className="relative flex flex-col gap-1">
                    <div className="rounded-2xl h-[50%] w-[50px] absolute bottom-0 right-0 bg-[var(--gold)] z-[-1] rotate-2 opacity-50" />
                    <p className="text-sm text-[var(--red)] font-[Unbounded]">
                      Score ,
                    </p>
                    <p className="font-semibold text-2xl font-[Space_Grotesk] text-[var(--red)] text-center">
                      {quizData?.score}
                    </p>
                  </div>
                ) : (
                  <Loader />
                )}
                {quizLoading ? (
                  <div className="relative flex flex-col gap-1">
                    <div className="rounded-2xl h-[50%] w-[50px] absolute bottom-0 right-0 bg-[var(--gold)] z-[-1] rotate-2 opacity-50" />
                    <p className="text-sm text-[var(--purple)] font-[Unbounded]">
                      Quizes ,
                    </p>
                    <p className="font-semibold text-2xl font-[Space_Grotesk] text-[var(--purple)] text-center">
                      {Object.keys(quizData?.history || {}).length || 0}
                    </p>
                  </div>
                ) : (
                  <Loader />
                )}
              </div>

              <div className="w-full flex flex-wrap justify-between gap-4 items-center">
                <div className="flex-1">
                  <Button
                    title={"Start Quiz"}
                    color1={"var(--gold)"}
                    color2={"var(--teal)"}
                    onClick={() => {
                      handleNavigate("/quiz");
                    }}
                  />
                </div>

                <div className="flex-1">
                  <Button
                    title={"Logout"}
                    color1={"var(--sky)"}
                    color2={"var(--red)"}
                    onClick={() => {
                      handleSignOut();
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="max-md:h-full flex flex-wrap justify-between gap-4 items-center">
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
          <div className="h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
      </div>

      <img
        className="max-md:max-w-[300px] max-[350px]:w-[230px] object-cover "
        src="/pics/hero.jpg"
        alt=""
      />
    </main>
  );
};

export default Page;
