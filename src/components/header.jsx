"use client";
import React, { useEffect, useState } from "react";
import { handleCurrentUser, handleSignOut } from "@/lib/auth";
import { usePathname } from "next/navigation";
import { Button } from "./elements";

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
    <div className="border flex flex-wrap justify-between items-center ">
      <div className="flex items-center gap-2 bg-white rounded-full px-2">
        <img
          className="h-[40px] w-[40px] object-cover rounded-full"
          src="/pics/avatar.jpg"
        />
        <p className="text-[var(--teal)] capitalizeshadow-[0px_0px_2px_var(--teal)]">
          {currentUser?.displayName}
        </p>
      </div>
      <div className="flex flex-row-reverse items-center bg-white rounded-full px-3 ">
        <img
          className="h-[40px] w-[40px] object-cover p-2"
          src="/pics/score.png"
        />
        <p className="text-[var(--teal)] font-[Space_Grotesk]">
          {userData?.events?.score}
        </p>
      </div>
    </div>
  );
};

export default Header;
