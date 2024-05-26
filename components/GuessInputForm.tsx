// src/components/GuessInputForm.tsx

import React, { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

type GuessInputFormProps = {
  onSubmit: (guess: string) => void;
  message: string;
};

const GuessInputForm: React.FC<GuessInputFormProps> = ({
  onSubmit,
  message,
}) => {
  const [guess, setGuess] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(guess);
    setGuess("");
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="w-full relative">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="px-4 py-2 border-2 w-full pr-10"
          placeholder="Type your guess here..."
        />
        <button
          type="submit"
          className="absolute right-0 top-0 h-full flex items-center justify-center px-4 bg-white border-2 border-l-0 rounded-r"
        >
          <FaArrowAltCircleRight className="text-2xl" />
        </button>
      </form>
      {message && <p className="mt-2 text-red-500 text-center">{message}</p>}
    </div>
  );
};

export default GuessInputForm;
