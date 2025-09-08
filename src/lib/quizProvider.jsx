"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authProvider";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

const QuizContext = createContext(null);

export const useQuiz = () => {
  return useContext(QuizContext);
};

const QuizProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const [quizData, setquizData] = useState(null);
  const [quizLoading, setquizLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setquizData(null);
      setquizLoading(true);
      return;
    }

    const ref = doc(db, "users", user.uid);

    const unsub = onSnapshot(ref, async (snap) => {
      if (snap.exists()) {
        setquizData(snap.data());
      } else {
        const newQuizData = {
          name: user.displayName,
          email: user.email,
          currentQuestion: 5,
          score: 200,
          questions: 21,
        };
        await setDoc(ref, newQuizData);
        setquizData(newQuizData);
      }
      setquizLoading(true);
    });

    return () => unsub();
  });

  const updateQuizData = async (data) => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    const updated = { ...quizData, ...data };

    setquizData(updated);
    await updateDoc(ref, updated);

    console.log("updatedddd", updated);
  };

  if (!quizLoading) {
    return <div>loading data ....</div>;
  }

  return (
    <QuizContext.Provider value={{ quizData, updateQuizData, quizLoading }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
