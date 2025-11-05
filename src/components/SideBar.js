import React from "react";
import { Home, Target, BarChart2, Settings, MessageSquare, Users } from "lucide-react";

const SideBar = () => {
  return (
    <div className="w-64 h-screen bg-[#5EC8F2] text-white flex flex-col">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-8 ">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 ">
          <img
            src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="font-semibold text-lg">James Smith</h2>
        <p className="text-sm text-white/70 tracking-wider">LOREM IPSUM</p>
      </div>

      {/* Menu Section */}
      <nav className="flex-1 mt-4">
        <MenuItem icon={<Home size={18} />} label="DASHBOARD" active />
        <MenuItem icon={<Target size={18} />} label="TARGETS" bordered />
        <MenuItem icon={<BarChart2 size={18} />} label="CHARTS" bordered />
        <MenuItem icon={<Settings size={18} />} label="SETTINGS" bordered />
        <MenuItem icon={<MessageSquare size={18} />} label="MESSAGES" bordered />
        <MenuItem icon={<Users size={18} />} label="NETWORK" bordered={false} />
      </nav>
    </div>
  );
};

const MenuItem = ({ icon, label, active, bordered = true }) => (
  <div
    className={`flex items-center space-x-3 cursor-pointer px-6 py-4 uppercase tracking-wide text-sm font-medium 
    transition-all duration-200 
    ${active ? "bg-[#208BBF]" : "hover:bg-[#48B2E0]/70"} 
    ${bordered ? "border-b border-white/30" : ""}`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default SideBar;
