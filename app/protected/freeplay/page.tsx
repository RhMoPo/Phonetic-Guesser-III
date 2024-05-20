"use client"
import React from "react";
import BackBtn from "@/components/BackBtn";
import PhoneticFetcher from "@/components/PhoneticFetcher";

const FreePlay = () => {
  return (
    <>
      <BackBtn />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <main className="flex flex-col items-center justify-center p-4">
          ༼ つ ◕_◕ ༽つ
          <PhoneticFetcher />
        </main>
      </div>
    </>
  );
};

export default FreePlay;
