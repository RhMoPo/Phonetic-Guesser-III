"use client"
import React from "react";
import BackBtn from "@/components/BackBtn";
import PhoneticFetcher from "@/components/PhoneticFetcher";

const FreePlay = () => {

  return (
    <>
      <BackBtn />(
      <div className="min-h-screen flex flex-col items-center justify-center">
        <main className="flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-bold text-center mb-8">
            Guess the Phonetic
          </h1>
          <PhoneticFetcher />
        </main>
      </div>
      );
    </>
  );
};

export default FreePlay;
