"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";
import quiz from "@/lib/quiz.json";
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
    if (!quizData?.currentQuiz?.answers?.[quiz.items[quizItemId].id]) return;
    if (quizItemId === quiz.items.length - 1) {
      console.log("done that's end of quiz");
    } else {
      setquizItemId((prev) => {
        const next = prev + 1;
        setTimeout(() => {
          updateQuizData({
            currentQuiz: {
              ...quizData.currentQuiz,
              currentQuestion: quiz.items[next].id,
            },
          });
        }, 10);
        return next;
      });
    }
  };

  const handlePrev = () => {
    if (quizItemId > 0) {
      setquizItemId((prev) => {
        const previous = prev - 1;
        setTimeout(() => {
          updateQuizData({
            currentQuiz: {
              ...quizData.currentQuiz,
              currentQuestion: quiz.items[previous].id,
            },
          });
        }, 10);
        return previous;
      });
    }
  };

  const handleAnswerSelect = (value) => {
    const currentAnswers = quizData?.currentQuiz?.answers || {};

    const updated = { ...currentAnswers, [quiz.items[quizItemId].id]: value };

    setanswers(updated);
    updateQuizData({
      currentQuiz: { ...quizData.currentQuiz, answers: updated },
    });
    console.log(quizData);
  };

  const handleQuizItemId = (update) => {
    setquizItemId(update);
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
            quiz.items?.[quizItemId]?.id
              ? quizData?.currentQuiz?.answers?.[quiz.items[quizItemId].id] ||
                null
              : null
          }
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrev={handlePrev}
          isFirst={quizItemId === 0}
          isLast={quizItemId === quiz.items.length - 1}
          updateQuizItemId={handleQuizItemId}
        />
      </div>
    </main>
  );
};

export default Page;
