import React, { useState } from "react";
import Topbar from "./Topbar";
import {
  Home,
  User,
  Settings,
  Bell,
  BarChart3
} from "lucide-react";

const Layout = ({ children }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard" },
    { icon: <BarChart3 size={20} />, label: "Analytics" },
    { icon: <User size={20} />, label: "Users" },
    { icon: <Bell size={20} />, label: "Notifications" },
    { icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <div className="flex">
      
      {/* Sidebar */}
      <div
        className={`h-screen bg-white border-r transition-all duration-300 
        ${isSidebarExpanded ? "w-56" : "w-16"}`}
      >
        <nav className="mt-4 flex flex-col gap-2 px-2">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              {item.icon}

              {/* Hide label when collapsed */}
              {isSidebarExpanded && (
                <span className="text-sm text-gray-700">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Topbar 
          onToggleSidebar={toggleSidebar}
          isSidebarExpanded={isSidebarExpanded}
        />

        <div className="p-4">{children}</div>
      </div>

    </div>
  );
};

export default Layout;
