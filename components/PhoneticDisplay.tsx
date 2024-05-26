// src/components/PhoneticDisplay.tsx

import React from "react";

type PhoneticDisplayProps = {
  phonetic: string;
};

const PhoneticDisplay: React.FC<PhoneticDisplayProps> = ({ phonetic }) => {
  return (
    <div className="w-full max-w-md">
      <p className="text-gray-600 text-4xl font-bold text-center mb-8">
        {phonetic}
      </p>
    </div>
  );
};

export default PhoneticDisplay;
