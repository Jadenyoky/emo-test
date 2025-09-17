"use client";
import React, { useEffect } from "react";
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

  useEffect(() => {
    if (!quizData?.lastQuiz && quizLoading) {
      router.push("/");
    }
  }, [quizData, quizLoading, router]);

  if (!quizLoading) return null;

  return (
    <div
      className="relative flex-1 max-w-[100%] max-md:w-[100%] w-[500px] 
            shadow-[var(--shadow2)]
            rounded-2xl max-md:rounded-[24px_24px_0_0] px-8 py-6 mx-auto flex flex-col justify-between gap-8"
    >
      <div
        className="absolute top-0 right-0 left-0 bottom-0 mask-b-from-0.5 opacity-10 rounded-2xl"
        style={{
          background: "url(/pics/result.jpg) no-repeat center center/cover",
        }}
      ></div>
      <div className="relative flex-1 flex flex-col justify-between gap-4 rounded-3xl ">
        <div
          className="rounded-xl flex items-center w-fit mx-auto justify-center gap-8 font-semibold bg-[var(--teal)] shadow-[var(--shadow3)] pr-4"
          style={{
            direction: "rtl",
          }}
        >
          <h1 className="text-xl text-[var(--gold)]">نتيجة الاختبار</h1>
          <div className="text-[var(--teal)] w-[50px] h-[50px] flex items-center justify-center rounded-xl bg-[white] text-xl -m-1">
            <i className="fi fi-sr-memo-circle-check text-2xl mt-1.5"></i>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 justify-around">
          <div className="font-[space_grotesk] border flex items-center justify-around border-[var(--smokey)] rounded-2xl px-4 py-8 bg-[#ffd9009a] gap-8 flex-wrap">
            <div className="relative bg-[white] text-[var(--sky)] font-semibold flex items-center justify-center text-2xl w-[70px] h-[70px] rounded-full order-1">
              {quizData?.lastQuiz?.correctQuestions}
              <span className="absolute top-[-10px] right-0 text-[white] bg-[var(--sky)] w-[30px] h-[30px] font-semibold rounded-full flex items-center justify-center text-base font-[space_grotesk]">
                <i className="fi fi-sr-check mt-1.5"></i>
              </span>
            </div>

            <div className="relative bg-[white] text-[var(--purple)] font-semibold flex items-center justify-center text-2xl w-[70px] h-[70px] rounded-full order-2 max-[375px]:order-3">
              {quizData?.lastQuiz?.percentage}
              <span className="absolute top-[-10px] right-0 text-[white] bg-[var(--purple)] w-[30px] h-[30px] font-semibold rounded-full flex items-center justify-center text-base font-[space_grotesk]">
                %
              </span>
            </div>

            <div className="relative bg-[white] text-[var(--red)] font-semibold flex items-center justify-center text-2xl w-[70px] h-[70px] rounded-full order-3 max-[375px]:order-2">
              {quizData?.lastQuiz?.wrongQuestions}
              <span className="absolute top-[-10px] right-0 text-[white] bg-[var(--red)] w-[30px] h-[30px] font-semibold rounded-full flex items-center justify-center text-base font-[space_grotesk]">
                <i className="fi fi-sr-x text-sm mt-1"></i>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h1 className=" text-[var(--sky)] bg-[white] font-semibold rounded-full flex items-center px-4 py-2  justify-center text-base z-[1] mb-[-10px]">
              النقاط
            </h1>
            <div
              className="relative rounded-full flex items-center w-fit mx-auto justify-center gap-4 font-semibold bg-[white] shadow-[var(--shadow2)] p-4"
              style={{
                direction: "rtl",
              }}
            >
              <span className="absolute top-[-2px] right-[10px] text-[var(--sky)] bg-[white] w-[30px] h-[30px] font-semibold rounded-full flex items-center justify-center text-base font-[space_grotesk] z-[2]">
                <i className="fi fi-sr-plus text-sm mt-1"></i>
              </span>

              <h1 className="text-[white] w-[70px] h-[70px] flex items-center justify-center rounded-full bg-[var(--sky)] font-[space_grotesk] text-2xl -m-1">
                {quizData?.lastQuiz?.quizScore}
              </h1>
            </div>
          </div>
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
