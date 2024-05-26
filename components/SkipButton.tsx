import React from "react";

interface SkipButtonProps {
  onSkip: () => void;
}

const SkipButton: React.FC<SkipButtonProps> = ({ onSkip }) => {
  return (
    <button
      onClick={onSkip}
      className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
    >
      Skip
    </button>
  );
};

export default SkipButton;
