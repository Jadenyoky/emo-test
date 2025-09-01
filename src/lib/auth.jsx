import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { handleGetData, handleUserData } from "./database";

export const handleCurrentUser = (setCurrentUser, setLoading, setUserData) => {
  const userState = onAuthStateChanged(auth, (user) => {
    console.log("user state changed1", user);
    
    setCurrentUser(user);

    if (user) {
      handleUserData(user);
      handleGetData(user, setUserData);
      console.log("User data fetched successfully", user);
    }
    setLoading(true);
  });
  return () => userState();
};

export const handleSignUp = async (email, password, current) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("user signed up", user);

    current();
  } catch (error) {
    console.log("user error sign up ", error);
  }
};

export const handleSignIn = async (email, password, current) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("user signed in", user);
    current();
  } catch (error) {
    console.log("user error sign in ", error);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log("user error sign out", err);
  }
};
