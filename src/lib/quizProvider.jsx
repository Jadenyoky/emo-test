"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authProvider";
import {
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { usePathname } from "next/navigation";

const QuizContext = createContext(null);

export const useQuiz = () => {
  return useContext(QuizContext);
};

const QuizProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const [quizData, setquizData] = useState({});
  const [quizLoading, setquizLoading] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setquizLoading(false);

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
          createdAt: serverTimestamp(),
          score: 0,
          positivePoints: 5,
          negativePoints: 0,
          currentQuiz: {
            currentQuestion: null,
            answers: {},
            quizScore: 0,
            completed: false,
            startedAt: serverTimestamp(),
          },
        };
        await setDoc(ref, newQuizData);
        setquizData(newQuizData);
      }
      setquizLoading(true);
    });

    return () => unsub();
  }, [pathname, user]);

  const updateQuizData = async (data) => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);
    const updated = { ...quizData, ...data };

    setquizData(updated);
    await updateDoc(ref, updated);

    console.log("updatedddd", updated);
  };

  // if (!quizLoading) {
  //   return null;
  // }

  return (
    <QuizContext.Provider value={{ quizData, updateQuizData, quizLoading }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
