"use client";
import React, { useEffect, useState } from "react";
import { handleCurrentUser } from "@/lib/auth";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState([]);

  const current = () => {
    handleCurrentUser(setCurrentUser, setLoading, setUserData);
  };

  useEffect(() => {
    current();
  }, []);

  if (!currentUser) return null;

  return (
    <div>
      <h1>Header title</h1>
    </div>
  );
};

export default Header;
