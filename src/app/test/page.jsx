"use client";
import Header from "@/components/header";
import React from "react";

const Page = () => {
  return (
    <main className="bg-[var(--smokey)]">
      <div className="container mx-auto min-h-svh flex flex-col gap-4 justify-center  px-4 py-4">
        <Header />
        <div className="border flex-[1.5]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
          odit quidem praesentium culpa, distinctio repellat corrupti! Pariatur
          adipisci illo praesentium nisi ea enim, laudantium totam porro, animi
          molestiae esse ipsum similique quaerat sequi fugiat reiciendis soluta
          harum! Corporis maiores quam exercitationem, omnis ullam mollitia
        </div>
        <div className="border flex-1">Hello</div>
      </div>
    </main>
  );
};

export default Page;
