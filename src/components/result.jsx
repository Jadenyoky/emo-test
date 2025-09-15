"use client";
import React from "react";
import { Button } from "./elements";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/lib/quizProvider";

const Result = () => {
  const { quizData, quizLoading } = useQuiz();

  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };

  console.log(quizData);

  if (!quizLoading) return null;

  return (
    <div
      className="flex-1 max-w-[100%] max-md:w-[100%] w-[500px] bg-[white]
            shadow-[var(--shadow2)]
            rounded-2xl max-md:rounded-[24px_24px_0_0] px-8 py-6 mx-auto flex flex-col justify-between gap-8"
    >
      <div
        className="flex-[1] -mx-8 -mt-6 min-h-[200px]"
        style={{
          background: "url(/pics/result.jpg) no-repeat center center/contain",
        }}
      ></div>
      <div className="relative flex-1 flex flex-col justify-around gap-4 text-[var(--purple)] bg-[var(--warm)] rounded-3xl py-8 px-8 ">
        <div
          className="absolute top-[-40px] right-[0px] shadow-[var(--shadow2)] flex items-center backdrop-blur-xl rounded-2xl px-8 py-4 gap-6 "
          style={{
            direction: "rtl",
          }}
        >
          <i className="fi fi-sr-memo-circle-check text-3xl mt-1.5"></i>
          <div className=" flex gap-2 flex-col">
            <h1 className="text-base font-semibold">نتائج آخر اختبار</h1>
            <p className="opacity-50 text-xs">ملخص وارقام الاختبار</p>
          </div>
        </div>

        <div
          className="mt-10  rounded-full flex items-center 
        justify-around
        max-sm:justify-between font-semibold font-[space_grotesk]"
        >
          <div className="w-[90px] h-[90px] bg-[var(--smokey)] text-[var(--purple)] rounded-full flex items-center justify-center text-xl">
            {quizData.lastQuiz.percentage}45 %
          </div>
          <div>
            <div className="flex items-center gap-4  text-[var(--teal)]">
              <i className="fi fi-sr-check-circle text-xl mt-1.5"></i>
              <p className="text-[var(--red] flex items-center justify-center rounded-full bg-[white] px-4">
                {quizData.lastQuiz.correctQuestions}
              </p>
            </div>
            <div className="flex items-center gap-4  text-[var(--red)]">
              <i className="fi fi-sr-circle-xmark text-xl mt-1.5"></i>
              <p className="text-[var(--red] flex items-center justify-center rounded-full bg-[white] px-4">
                {quizData.lastQuiz.wrongQuestions}
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-full flex items-center w-fit mx-auto justify-center gap-4 font-semibold bg-[white] shadow-[var(--shadow3)] pr-4"
          style={{
            direction: "rtl",
          }}
        >
          <h1 className="font-[changa]">النقاط</h1>
          <h1 className="text-[var(--gold)] w-[50px] h-[50px] flex items-center justify-center rounded-full bg-[var(--purple)] text-xl -m-1">
            {quizData.lastQuiz.quizScore}
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center max-w-[100%] w-[500px] mx-auto justify-between gap-4 *:flex-1">
        <Button
          color1={"var(--teal)"}
          color2={"var(--teal)"}
          title={"البداية"}
          textColor={"var(--gold)"}
          onClick={() => {
            handleNavigate("/");
          }}
        />
        <Button
          color1={"var(--purple)"}
          color2={"var(--purple)"}
          title={"الاختبار"}
          textColor={"var(--gold)"}
          onClick={() => {
            handleNavigate("/quiz");
          }}
        />
      </div>
    </div>
  );
};

export default Result;
