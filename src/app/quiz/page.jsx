"use client";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { handleSignOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";
import questions from "@/lib/questions.json";
import { Button, Radio } from "@/components/elements";

const Page = () => {
  const { user, loading } = useAuth();
  const { quizData, updateQuizData } = useQuiz();

  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };

  return (
    <main className="bg-[var(--smokey)]">
      <div className="container px-4 py-4 mx-auto min-h-svh flex flex-col gap-4 justify-between ">
        <Header handleNavigate={handleNavigate} />
        <div
          className="flex-1 max-w-[100%] w-[500px] bg-[white] 
        shadow-[var(--shadow3)]
        rounded-2xl px-8 py-6 mx-auto flex flex-col justify-between gap-8"
        >
          <div className="relative justify-baseline flex flex-col gap-8 ">
            <div className="rounded-2xl bg-[var(--sky)] mx-auto max-w-[50%] shadow-[var(--shadow2)]">
              <video
                src={questions.items[1].video}
                loop
                muted
                autoPlay
                className="aspect-square object-cover rounded-2xl"
              ></video>
            </div>
            <div className="flex items-center relative gap-4 font-[space_grotesk]">
              <div className="relative flex-1 h-[28px] rounded-full bg-white flex flex-col justify-center shadow-[var(--shadow)]">
                <div className="absolute w-[25%] h-full rounded-full bg-[var(--sky)]"></div>
              </div>
              <div className="bg-[white] w-fit px-4 rounded-full text-[var(--purple)] flex gap-2 items-center shadow-[var(--shadow)]">
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

          <Radio />
          {/* <div className="bg-[var(--sky)] w-full rounded-2xl">
            <div className="flex flex-col gap-4 p-4 ">
              <div className=" flex-1 flex bg-[var(--smokey)] rounded-full p-3 px-8 items-center gap-4 justify-end">
                <div>الانضباط</div>
                <p>1</p>
              </div>
              <div className=" flex-1 flex bg-[var(--smokey)] rounded-full p-3 px-8 items-center gap-4 justify-end">
                <div>الانضباط</div>
                <p>1</p>
              </div>
              <div className=" flex-1 flex bg-[var(--smokey)] rounded-full p-3 px-8 items-center gap-4 justify-end">
                <div>الانضباط</div>
                <p>1</p>
              </div>
              <div className=" flex-1 flex bg-[var(--smokey)] rounded-full p-3 px-8 items-center gap-4 justify-end">
                <div>الانضباط</div>
                <p>1</p>
              </div>
            </div>
          </div> */}

          <div className="flex items-center max-w-[100%] w-[500px] mx-auto *:flex-1 gap-4">
            <Button
              color1={"var(--gold)"}
              color2={"var(--teal)"}
              textColor={""}
              title="change names"
            />
            <Button
              color1={"var(--red)"}
              color2={"var(--gold)"}
              textColor={"var(--black)"}
              title="skip"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
