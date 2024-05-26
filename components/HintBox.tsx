import React from "react";

type HintBoxProps = {
  definitions: string[];
  showHint: boolean;
};

const HintBox: React.FC<HintBoxProps> = ({ definitions, showHint }) => {
  return (
    <div className="w-full max-w-md mt-4 p-4 h-40 overflow-hidden">
      <div
        className={`transition-opacity duration-300 ease-in-out ${showHint ? "opacity-100" : "opacity-0"}`}
      >
        <ul className="list-disc list-inside">
          {definitions.map((definition, index) => (
            <li key={index}>{definition}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HintBox;
