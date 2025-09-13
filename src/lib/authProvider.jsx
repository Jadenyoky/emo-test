"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import Loader from "@/components/loader";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setuser(user);
      console.log(pathname);
      console.log("user signed in", user);

      if ((pathname === "/signup" || pathname === "/login") && user) {
        router.push("/");
      } else if (pathname === "/quiz" && !user) {
        router.push("/");
      } else if (pathname === "/result" && !user) {
        router.push("/");
      }
      setloading(true);
    });
    return () => unsub();
  }, [pathname]);

  if (!loading)
    return (
      <div className="h-svh flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
