"use client";
import React, { useEffect, useState } from "react";
import { handleSignOut } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { Button } from "./elements";
import { useAuth } from "@/lib/authProvider";
import { useQuiz } from "@/lib/quizProvider";

const Header = ({ handleNavigate }) => {
  const { user, loading } = useAuth();
  const { quizData } = useQuiz();

  const [menu, setmenu] = useState(false);

  const handleMenu = () => {
    setmenu(!menu);
  };

  if (!user) return null;

  return (
    <div className="flex flex-wrap justify-between items-center ">
      {menu && (
        <div className=" z-[200] fixed h-svh w-full top-0 left-0 flex flex-col justify-center max-md:justify-end items-center backdrop-blur-lg ">
          <div
            className="fixed z-[-1] h-svh w-full top-0 left-0  bg-[var(--black)] opacity-50"
            onClick={() => {
              handleMenu();
            }}
          />
          <div className="bg-[var(--smokey)] rounded-2xl max-md:rounded-[32px_32px_0_0] px-16 py-8 drop-shadow-2xl max-md:w-[100%] flex justify-center shadow-[var(--shadow3)] ">
            <div className="w-fit flex justify-center gap-8 flex-col">
              <div className="flex justify-center gap-4 flex-col">
                <Button
                  color1={"var(--teal)"}
                  color2={"var(--teal)"}
                  textColor={""}
                  title="change name"
                />
                <Button
                  color1={"var(--teal)"}
                  color2={"var(--teal)"}
                  textColor={""}
                  title="update avatar"
                />
              </div>
              <Button
                color1={"var(--red)"}
                color2={"var(--red)"}
                textColor={""}
                title="logout"
                onClick={async () => {
                  await handleSignOut();
                  handleNavigate("/");
                }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-2">
        <button
          className="bg-[white] flex items-center justify-center px-4 rounded-full cursor-pointer 
          "
          onClick={() => {
            handleMenu();
          }}
        >
          <i className="fi fi-rr-menu-burger mt-1.5 text-[var(--teal)]"></i>
        </button>
        <div
          className="flex items-center gap-2 bg-white rounded-full px-2
        "
        >
          <img
            className="h-[40px] w-[40px] object-cover rounded-full"
            src="/pics/avatar.jpg"
          />
          <p className="text-[var(--teal)] capitalize">{user?.displayName}</p>
        </div>
      </div>
      <div
        className="flex flex-row-reverse items-center bg-white rounded-full px-3 
      "
      >
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
