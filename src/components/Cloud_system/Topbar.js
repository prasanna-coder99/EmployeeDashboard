import React from "react";
import { PanelLeftClose, Moon, Sun, Bell, ChevronDown } from "lucide-react";

const Topbar = ({ onToggleSidebar, isSidebarExpanded, darkMode, setDarkMode }) => {
  return (
    <div className="h-16 bg-background-dashboard dark:bg-gray-900  flex items-center justify-between px-6 transition-colors duration-300">
      
      {/* Left section */}
      <div className="flex items-center gap-4">
        <img src="/Logo/Naflogo.png" alt="logo" className="w-9 h-9 ml-[-10px] " />

       <button
  onClick={onToggleSidebar}
  className={`w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-300 rounded-lg transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700
    ${isSidebarExpanded ? "ml-[150px]" : "ml-[-14px]"}`}
  aria-label={isSidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
>
  <PanelLeftClose 
    size={20}
    className={`transition-transform duration-300 ${
      !isSidebarExpanded ? "rotate-180" : ""
    }`}
  />
</button>


        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Cloud System
        </h1>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 dark:text-yellow-400 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Notifications */}
        <button 
          className="w-10 h-10 relative flex items-center justify-center rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="flex items-center gap-2 cursor-pointer rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 transition-all duration-200 ml-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
            MK
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Max Klein</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Super Admin</span>
          </div>
          <ChevronDown size={16} className="text-gray-500 dark:text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;