"use client";
import React, { useEffect, useState } from "react";
import { handleSignOut } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { Button } from "./elements";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";

const Header = () => {
  const { user, loading } = useAuth();
  const { quizData } = useQuiz();

  if (!user) return null;

  return (
    <div className="flex flex-wrap justify-between items-center ">
      <div className="flex items-center gap-2 bg-white rounded-full px-2">
        <img
          className="h-[40px] w-[40px] object-cover rounded-full"
          src="/pics/avatar.jpg"
        />
        <p className="text-[var(--teal)] capitalizeshadow-[0px_0px_2px_var(--teal)]">
          {user?.displayName}
        </p>
      </div>
      <div className="flex flex-row-reverse items-center bg-white rounded-full px-3 ">
        <img
          className="h-[40px] w-[40px] object-cover p-2"
          src="/pics/score.png"
        />
        <p className="font-semibold text-xl font-[Space_Grotesk] text-[var(--red)]">
          {quizData?.score}
        </p>
      </div>
    </div>
  );
};

export default Header;
