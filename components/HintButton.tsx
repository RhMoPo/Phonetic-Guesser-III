import React, { useState, useEffect } from "react";
import { FaQuestion } from "react-icons/fa";

interface HintButtonProps {
  onHint: () => void;
  showHint: boolean;
  initialTop?: string;
  initialLeft?: string;
}

const HintButton: React.FC<HintButtonProps> = ({
  onHint,
  showHint,
  initialTop = "30%",
  initialLeft = "50%",
}) => {
  const [position, setPosition] = useState({
    top: initialTop,
    left: initialLeft,
  });

  const moveButtonRandomly = () => {
    const randomTop =
      Math.floor(Math.random() * (window.innerHeight - 50)) + "px";
    const randomLeft =
      Math.floor(Math.random() * (window.innerWidth - 50)) + "px";
    setPosition({ top: randomTop, left: randomLeft });
  };

  useEffect(() => {
    const interval = setInterval(moveButtonRandomly, 1000); // Move every second
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleClick = () => {
    onHint();
  };

  return (
    <button
      id="hint-button"
      onClick={handleClick}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
      }}
      className={`z-10 w-12 h-12 flex items-center justify-center bg-mint text-black border-black rounded-full hover:bg-green-600 transition-all duration-300 ${showHint ? "rotate-180" : ""}`}
    >
      <FaQuestion className="text-3xl" />
    </button>
  );
};

export default HintButton;
