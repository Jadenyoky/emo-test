import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";

// ------------------ SIGN UP ------------------
export const handleSignUp = async (data, setError, name) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await updateProfile(user, { displayName: name });

    return true;
  } catch (error) {
    console.log("user error sign up ", error);
    handleFirebaseError(error, setError);
    return false;
  }
};

// ------------------ LOGIN ------------------
export const handleLogin = async (data, setError) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return true;
  } catch (error) {
    console.log("user error sign in ", error);
    handleFirebaseError(error, setError);
    return false;
  }
};

// ------------------ LOGOUT ------------------
export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log("user error sign out", err);
  }
};

// ------------------ ERRORS ------------------
const firebaseErrors = {
  "auth/email-already-in-use": "Email already in use",
  "auth/invalid-email": "Invalid email",
  "auth/user-disabled": "User disabled",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Wrong password",
  "auth/weak-password": "Weak password",
  "auth/missing-password": "Password missing",
  "auth/network-request-failed": "Network error",
  "auth/too-many-requests": "Too many requests",
  "auth/invalid-credential": "Email or password wrong",
};

export const handleFirebaseError = (error, setError) => {
  const msg = firebaseErrors[error.code] || "Something went wrong";

  if (msg) {
    if (error.code?.includes("password")) {
      setError("password", { type: "manual", message: msg });
    } else if (error.code?.includes("email") || error.code?.includes("user")) {
      setError("email", { type: "manual", message: msg });
    } else {
      setError("root", { type: "manual", message: msg });
    }
  }
};
