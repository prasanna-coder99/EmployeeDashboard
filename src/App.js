import React, { useState, useEffect } from "react";
import Dashboard from "./components/Cloud_system/Dashboard";
import Topbar from "./components/Cloud_system/Topbar";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  // Add or remove `dark` class on the <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="min-h-screen bg-background-dashboard dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Topbar 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onToggleSidebar={toggleSidebar}
        isSidebarExpanded={isSidebarExpanded}
      />

      <Dashboard isSidebarExpanded={isSidebarExpanded} />
    </div>
  );
}

export default App;