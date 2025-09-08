"use client";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { handleSignOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";

const Page = () => {
  const { user, loading } = useAuth();
  const { quizData, updateQuizData } = useQuiz();

  const router = useRouter();

  return (
    <main className="bg-[var(--smokey)]">
      <div className="container px-4 py-4 mx-auto min-h-svh flex flex-col gap-4 justify-center">
        <Header />
        {quizData?.score}
        <div
          className="flex-1 border border-[var(--sky)] rounded-2xl p-4 bg-white cursor-pointer"
          onClick={() => {
            updateQuizData({ score: quizData?.score + 1 });
          }}
        >
          increase your score
        </div>
        <div className="flex-1 border border-[var(--purple)] rounded-2xl p-4 bg-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
          odit quidem praesentium culpa, distinctio repellat corrupti! Pariatur
          adipisci illo praesentium nisi ea enim, laudantium totam porro,
        </div>
        <div className="flex-1 border border-[var(--teal)] rounded-2xl p-4 bg-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </div>
        <div className="border flex-1">Hello</div>
      </div>
    </main>
  );
};

export default Page;
