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
import Question from "@/components/question";

const Page = () => {
  const { user, loading } = useAuth();
  const { quizData, updateQuizData } = useQuiz();

  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };

  const [quizItemId, setquizItemId] = useState(0);
  const [answers, setanswers] = useState({});

  const handleNext = () => {
    if (!quizData?.answers?.[quiz.items[quizItemId].id]) return;
    if (quizItemId === quiz.items.length - 1) {
      console.log("done that's end of quiz");
    } else {
      setquizItemId(quizItemId + 1);
    }
  };

  const handlePrev = () => {
    if (quizItemId > 0) {
      setquizItemId(quizItemId - 1);
    }
  };

  const handleAnswerSelect = (value) => {
    const currentAnswers = quizData?.answers || {};

    const updated = { ...currentAnswers, [quiz.items[quizItemId].id]: value };

    setanswers(updated);
    updateQuizData({ answers: updated });
    console.log(quizData);
  };

  return (
    <main className="bg-[var(--smokey)]">
      <div className="container px-4 py-4 mx-auto min-h-svh flex flex-col gap-4 justify-between max-md:p-0 ">
        <div className="max-md:pt-4 max-md:px-4">
          <Header handleNavigate={handleNavigate} />
        </div>

        <Question
          allData={quiz}
          quizItemId={quizItemId}
          selectedAnswer={
            quizData?.answers?.[quiz.items[quizItemId].id] || null
          }
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={quizItemId === 0}
          isLast={quizItemId === quiz.items.length - 1}
        />
      </div>
    </main>
  );
};

export default Page;
