"use client";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const handleUserData = async (user) => {
  try {
    const addNewUser = await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      name: user.displayName,
      sleep: "no",
      events: {
        score: 100,
        question: 3,
      },
      createdAt: serverTimestamp(),
    });
    return addNewUser;
  } catch (error) {
    console.log("user error handle user data", error);
  }
};

export const handleGetData = async (user, setUserData) => {
  try {
    const dataSaved = await getDoc(doc(db, "users", user.uid));

    if (dataSaved.exists()) {
      console.log("User data:", dataSaved.data());
      setUserData(dataSaved.data());
    } else {
      console.log("No user data found");
    }
  } catch (error) {
    console.log("user error get user data", error);
  }
};
