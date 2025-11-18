// components/Dashboard.jsx
import React from 'react';
import Sidebar from '../Cloud_system/Sidebar';
import Todaysales from './Todaysales';
import InventoryLevel from './InventoryLevel';
import SalesAnalysis from './SalesAnalysis';
import MachineStatus from './MachineStatus';

const Dashboard = ({ isSidebarExpanded }) => {
  return (
    <div className="flex bg-background-dashboard dark:bg-gray-900 dark:text-white">
      <Sidebar isSidebarExpanded={isSidebarExpanded} />
      
      <div className="flex-1 flex gap-4 p-4">

        <div className={`${isSidebarExpanded ? 'flex-1' : 'w-[600px]' } flex flex-col gap-4 transition-all duration-300`}>
          <Todaysales />

          {/* ⭐ Inventory Level shifts right only when sidebar is collapsed */}
          <div className={`${isSidebarExpanded ? "" : "ml-14"} transition-all duration-300`}>
            <InventoryLevel />
          </div>

        </div>

        <div className="flex-1 flex flex-col gap-4">
          <SalesAnalysis />
          <MachineStatus />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
