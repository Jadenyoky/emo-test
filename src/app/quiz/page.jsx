"use client";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { handleSignOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";
import quiz from "@/lib/quiz.json";
import { Button, Radio } from "@/components/elements";
import { xor } from "lodash";

const Page = () => {
  const { user, loading } = useAuth();
  const { quizData, updateQuizData } = useQuiz();

  const router = useRouter();

  const [quizItemId, setquizItemId] = useState(0);

  const handleNavigate = (location) => {
    router.push(location);
  };

  return (
    <main className="bg-[var(--smokey)]">
      <div className="container px-4 py-4 mx-auto min-h-svh flex flex-col gap-4 justify-between max-md:p-0 ">
        <div className="max-md:pt-4 max-md:px-4">
          <Header handleNavigate={handleNavigate} />
        </div>
        <div
          className="flex-1 max-w-[100%] w-[500px] bg-[white] 
        shadow-[var(--shadow2)] 
        rounded-2xl max-md:rounded-[24px_24px_0_0] px-8 py-6 mx-auto flex flex-col justify-between gap-4"
        >
          <div className="relative justify-between flex flex-col gap-4 ">
            <div className="h-[12px] rounded-full bg-white flex flex-col justify-center shadow-[var(--shadow)]">
              <div
                className={`h-full rounded-full bg-[var(--sky)]
                transition-all duration-500 ease-in-out
                `}
                style={{
                  width: `${((quizItemId + 1) / quiz.items.length) * 100}%`,
                }}
              ></div>
            </div>

            <div className="relative rounded-2xl flex items-center justify-center">
              <div
                className="bg-[white] w-fit px-4 rounded-full text-[var(--purple)] flex gap-2 items-center shadow-[var(--shadow)] font-[space_grotesk]
absolute top-[0] left-0
"
              >
                <p className="text-xl text-[var(--sky)]">
                  {quiz.items[quizItemId].id}
                </p>{" "}
                <div className="flex gap-1 text-xs">
                  <span className="">/</span>
                  <p className="">{quiz.items.length}</p>
                </div>
              </div>
              <video
                src={quiz.items[quizItemId].video}
                loop
                muted
                autoPlay
                className="aspect-square object-cover rounded-2xl max-w-[50%]
                 shadow-[var(--shadow2)] max-md:ml-10
                "
              />
            </div>
            <div className="text-[var(--sky)] flex-1 text-right my-3 max-md:text-center">
              {quiz.question}
            </div>
          </div>

          <Radio quizItemId={quiz.items[quizItemId].id - 1} />

          <div className="flex flex-wrap items-center max-w-[100%] w-[500px] mx-auto justify-between gap-4">
            <div className="flex-[1]">
              <Button
                color1={"var(--gold)"}
                color2={"var(--red)"}
                textColor={"black"}
                title="السابق"
                onClick={() => {
                  if (quizItemId >= 1) setquizItemId(quizItemId - 1);
                }}
              />
            </div>
            <div className="flex-[1.5]">
              <Button
                color1={"var(--teal)"}
                color2={"var(--teal)"}
                textColor={"var(--gold)"}
                title={
                  quizItemId === quiz.items.length - 1 ? "النتيجة" : "التالي"
                }
                onClick={() => {
                  if (quizItemId === quiz.items.length - 1) {
                    console.log("done");
                  } else {
                    setquizItemId(quizItemId + 1);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
