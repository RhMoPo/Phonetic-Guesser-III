import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-mint text-gray-600 py-4 absolute bottom-0">
      <div className="container mx-auto text-center">
        <p>Phonetic Guesser by Rhys Postans</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://www.linkedin.com/in/rhyspostans/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center"
          >
            <FaLinkedin className="mr-1" />
            LinkedIn
          </a>
          <a
            href="https://github.com/RhMoPo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center"
          >
            <FaGithub className="mr-1" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
