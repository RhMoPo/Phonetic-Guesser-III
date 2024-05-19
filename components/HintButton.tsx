import React from "react";

interface HintButtonProps {
  onHint: () => void;
  showHint: boolean;
}

const HintButton: React.FC<HintButtonProps> = ({ onHint, showHint }) => {
  return (
    <button
      onClick={onHint}
      className="mt-2 px-4 py-2 bg-green-500 text-white rounded w-full"
    >
      {showHint ? "Hide Hint" : "Show Hint"}
    </button>
  );
};

export default HintButton;
