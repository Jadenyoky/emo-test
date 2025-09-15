"use client";
import Header from "@/components/header";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";
import quiz from "@/lib/quiz.json";
import Question from "@/components/question";
import { serverTimestamp } from "firebase/firestore";
import Loader from "@/components/loader";

const Page = () => {
  const { user, loading } = useAuth();
  const { quizData, updateQuizData } = useQuiz();

  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };

  const [quizItemId, setquizItemId] = useState(0);
  const [answers, setanswers] = useState({});
  const [resultLoading, setresultLoading] = useState(true);

  const handleNext = () => {
    if (!quizData?.currentQuiz?.answers?.[quiz.items[quizItemId].id]) return;
    if (quizItemId === quiz.items.length - 1) {
      console.log("done that's end of quiz");
    } else {
      setquizItemId((prev) => {
        const next = prev + 1;
        return next;
      });
    }
  };

  const handlePrev = () => {
    if (quizItemId > 0) {
      setquizItemId((prev) => {
        const previous = prev - 1;
        return previous;
      });
    }
  };

  const handleAnswerSelect = (value) => {
    const currentAnswers = quizData?.currentQuiz?.answers || {};

    const updated = { ...currentAnswers, [quiz.items[quizItemId].id]: value };
    const lastId = Number(Object.keys(updated).at(-1));

    setanswers(updated);
    updateQuizData({
      currentQuiz: {
        ...quizData.currentQuiz,
        answers: updated,
        lastQuestion: lastId,
      },
    });
    console.log(quizData, updated, lastId);
  };

  const handleQuizItemId = (update) => {
    setquizItemId(update);
  };

  const handleResult = async () => {
    if (!quizData?.currentQuiz) return null;

    setresultLoading(false);

    const answers = quizData?.currentQuiz?.answers;

    let score = 0;
    let results = [];
    let correctNum = 0;
    let wrongNum = 0;

    Object.entries(answers).forEach(([key, value]) => {
      const current = quiz.items[key - 1];
      const isCorrect = current.correctAnswer === value;
      const isWrong = current.correctAnswer !== value;

      score += isCorrect ? quizData.positivePoints : quizData.negativePoints;

      if (isCorrect) {
        correctNum += 1;
      } else if (isWrong) {
        wrongNum += 1;
      }

      results.push({
        ...current,
        userAnswer: value,
        correct: isCorrect,
      });
    });

    const newQuizHistory = {
      completed: true,
      startedAt: quizData?.currentQuiz?.startedAt,
      completedAt: serverTimestamp(),
      quizScore: score,
      resultAnswers: results,
      correctQuestions: correctNum,
      wrongQuestions: wrongNum,
      percentage: ((correctNum / (correctNum + wrongNum)) * 100).toFixed(0),
    };

    const quizId = Object.keys(quizData.history || {}).length + 1;

    await updateQuizData({
      ...quizData,
      score: quizData.score + score,
      lastQuiz: newQuizHistory,
      history: {
        ...(quizData.history || {}),
        [`quiz_${quizId}`]: newQuizHistory,
      },
      currentQuiz: {
        lastQuestion: null,
        answers: {},
        quizScore: 0,
        completed: false,
        startedAt: serverTimestamp(),
        completedAt: null,
      },
    });
    handleQuizItemId(0);

    router.push("/result");
  };

  return (
    <main className="bg-[var(--smokey)]">
      <div className="container px-4 py-4 mx-auto min-h-svh flex flex-col gap-4 justify-between max-md:p-0 ">
        <div className="max-md:pt-4 max-md:px-4">
          <Header />
        </div>
        {resultLoading ? (
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
            onResult={handleResult}
          />
        ) : (
          <div className="flex justify-center items-center flex-1">
            <div className=" z-[200] fixed h-svh w-full top-0 left-0 flex flex-col justify-center max-md:justify-end items-center backdrop-blur-sm ">
              <div className="fixed z-[-1] h-svh w-full top-0 left-0  bg-[var(--teal)] opacity-50" />
              <div className="flex justify-center items-center m-auto bg-[var(--smokey)] p-4 rounded-3xl shadow-[var(--shadow2)]">
                <Loader />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Page;
