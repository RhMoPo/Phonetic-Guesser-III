import React from "react";
import Link from "next/link";

const BackBtn: React.FC = () => {
  return (
    <Link
      href="/protected"
      className="absolute top-4 left-4 p-2 text-white bg-black rounded-md z-20"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </Link>
  );
};

export default BackBtn;
