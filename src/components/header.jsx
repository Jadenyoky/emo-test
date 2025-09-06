"use client";
import React, { useEffect, useState } from "react";
import { handleCurrentUser, handleSignOut } from "@/lib/auth";
import { usePathname } from "next/navigation";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState([]);

  const [settings, setSettings] = useState(false);

  const current = () => {
    handleCurrentUser(setCurrentUser, setLoading, setUserData);
  };

  useEffect(() => {
    current();
  }, []);

  if (!currentUser) return null;

  return (
    <div className="sticky top-0 z-10 bg-[white] border-b border-[var(--sky)] flex items-center justify-baseline px-6 py-2 gap-8">
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <div
          className="cursor-pointer border-2 border-[var(--sky)] rounded-full  flex justify-center items-center w-[50px] h-[50px] "
          onClick={() => {
            setSettings(!settings);
          }}
        >
          <img
            className="h-full w-full object-cover rounded-full"
            src="/pics/avatar.jpg"
          />
        </div>
        <p className="text-[var(--teal)] capitalize rounded-full px-4 py-1 shadow-[0px_0px_2px_var(--teal)] truncate max-sm:hidden">
          {currentUser?.displayName}
        </p>
      </div>
      <div className="flex items-center gap-3 p-1">
        <p className="text-[var(--teal)] border-2 border-[var(--gold)] rounded-full px-2 capitalize font-[Space_Grotesk]">
          {userData?.events?.score}
        </p>
        <img src="/pics/score.png" className="object-cover w-[35px]" alt="" />
      </div>
      <button
        className="cursor-pointer border border-[var(--red)] rounded-full px-4 py-1 text-[var(--red)] max-sm:hidden hover:bg-[var(--red)] hover:text-white transition"
        onClick={() => {
          handleSignOut();
        }}
      >
        Logout
      </button>

      {settings && (
        <div className="absolute bottom-[calc(-100%-2px)] left-0 bg-white border border-[var(--sky)] rounded-md shadow-lg flex gap-4 p-4">
          <p className="text-[var(--teal)] capitalize rounded-full px-4 py-1 shadow-[0px_0px_2px_var(--teal)] truncate">
            ahmed hussien
          </p>
          <button
            className="cursor-pointer border border-[var(--red)] rounded-full px-4 py-1 text-[var(--red)] hover:bg-[var(--red)] hover:text-white transition"
            onClick={() => {
              handleSignOut();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
