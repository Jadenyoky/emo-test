import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
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

export const handleSignUp = async (data, setError, name, current) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await updateProfile(user, {
      displayName: name,
    });

    current();

    console.log("user signed up", user);
  } catch (error) {
    console.log("user error sign up ", error);
    handleFirebaseError(error, setError);
  }
};

export const handleLogin = async (data, setError) => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    console.log("user signed in", user);
  } catch (error) {
    console.log("user error sign in ", error);
    handleFirebaseError(error, setError);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.log("user error sign out", err);
  }
};

const firebaseErrors = {
  "auth/email-already-in-use": "Email is taken",
  "auth/invalid-email": "Invalid email",
  "auth/user-disabled": "User disabled",
  "auth/user-not-found": "User not found",
  "auth/wrong-password": "Wrong password",
  "auth/weak-password": "Weak password",
  "auth/missing-password": "Password missing",
  "auth/network-request-failed": "Network error",
  "auth/too-many-requests": "Too many requests",
  "auth/internal-error": "Internal error",
  "auth/invalid-credential": "email or password wrong",
  "auth/account-exists-with-different-credential":
    "Account with other provider",
  "auth/credential-already-in-use": "Credential in use",
  "auth/operation-not-allowed": "Operation not allowed",
  "auth/popup-blocked": "Popup blocked",
  "auth/popup-closed-by-user": "Popup closed",
  "auth/cancelled-popup-request": "Popup cancelled",
  "auth/unauthorized-domain": "Unauthorized domain",
  "auth/invalid-api-key": "Invalid API key",
  "auth/app-deleted": "App deleted",
  "auth/invalid-user-token": "Invalid user token",
  "auth/user-token-expired": "User token expired",
  "auth/null-user": "No user",
  "auth/requires-recent-login": "Need recent login",
  "auth/invalid-verification-code": "Invalid code",
  "auth/missing-verification-code": "Code missing",
  "auth/code-expired": "Code expired",
  "auth/invalid-verification-id": "Invalid verification ID",
  "auth/missing-verification-id": "Verification ID missing",
  "auth/invalid-phone-number": "Invalid phone",
  "auth/missing-phone-number": "Phone missing",
  "auth/quota-exceeded": "SMS quota exceeded",
  "auth/captcha-check-failed": "Captcha failed",
  "auth/missing-app-credential": "App credential missing",
  "auth/invalid-app-credential": "Invalid app credential",
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
