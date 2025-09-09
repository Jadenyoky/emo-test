"use client";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { handleSignOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";
import questions from "@/lib/questions.json";
import { Button } from "@/components/elements";

const Page = () => {
  const { user, loading } = useAuth();
  const { quizData, updateQuizData } = useQuiz();

  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };

  return (
    <main className="bg-[var(--smokey)]">
      <div className="container px-4 py-4 mx-auto min-h-svh flex flex-col gap-4 justify-center">
        <Header handleNavigate={handleNavigate} />
        <div className="max-w-[100%] w-[500px] bg-[var(--smokey)] shadow-2xl rounded-xl flex-1 px-4 py-4 mx-auto flex flex-col gap-8 justify-between ">
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-white flex flex-col justify-center text-right w-fit mx-auto">
              <video
                src={questions.items[2].video}
                loop
                muted
                autoPlay
                className=" object-cover w-[200px] rounded-2xl"
              ></video>
            </div>
            <div className="flex items-center relative gap-4 font-[space_grotesk]">
              <div className="relative flex-1 h-[28px] shadow border-[white] rounded-full bg-white flex flex-col justify-center">
                <div className="absolute w-[25%] h-full rounded-full bg-[var(--sky)]"></div>
              </div>
              <div className="bg-[white] w-fit px-4 rounded-full text-[var(--purple)] flex gap-2 items-center shadow">
                <p className="text-xl text-[var(--sky)]">
                  {questions.items[10].id}
                </p>{" "}
                <div className="flex gap-1 text-xs">
                  <span className="">/</span>
                  <p className="">{questions.items.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--gold)] w-full px-8 rounded-2xl">
            <div className="flex flex-col justify-between gap-4 p-5">
              <div className=" flex-1 flex bg-white rounded-full p-3 px-8 items-center gap-4 justify-end">
                <div>الانضباط</div>
                <p>1</p>
              </div>
              <div className=" flex-1 flex bg-white rounded-full p-3 px-8 items-center gap-4 justify-end">
                <div>الانضباط</div>
                <p>1</p>
              </div>
              <div className=" flex-1 flex bg-white rounded-full p-3 px-8 items-center gap-4 justify-end">
                <div>الانضباط</div>
                <p>1</p>
              </div>
              <div className=" flex-1 flex bg-white rounded-full p-3 px-8 items-center gap-4 justify-end">
                <div>الانضباط</div>
                <p>1</p>
              </div>
            </div>
          </div>

          <Button
            color1={"var(--teal)"}
            color2={"var(--teal)"}
            textColor={""}
            title="change names"
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
