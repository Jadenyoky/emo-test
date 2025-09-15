"use client";
import Header from "@/components/header";
import Result from "@/components/result";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  const handleNavigate = (location) => {
    router.push(location);
  };
  return (
    <main className="bg-[var(--smokey)]">
      <div className="container px-4 py-4 mx-auto min-h-svh flex flex-col gap-4 justify-between max-md:p-0 ">
        <div className="max-md:pt-4 max-md:px-4">
          <Header />
        </div>
        <Result />
        
      </div>
    </main>
  );
};

export default Page;
