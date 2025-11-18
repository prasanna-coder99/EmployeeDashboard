// DarkModeContent.jsx
import React, { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

const DarkModeContent = ({ children }) => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex-1 p-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {children}
    </div>
  );
};

export default DarkModeContent;
