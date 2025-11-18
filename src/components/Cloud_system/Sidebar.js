import React, { useState } from 'react';
import { 
  Home, Eye, BarChart3, Receipt, FileText, Settings, Package, ShoppingCart, 
  Megaphone, CreditCard, Percent, Gift, Users, Calculator, Wrench, ClipboardList, 
  Box, GitBranch, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';

const Sidebar = ({ isSidebarExpanded = true }) => {
  const [expandedSections, setExpandedSections] = useState({
    view: true,
    manage: true,
    maintenance: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className={`${isSidebarExpanded ? 'w-60' : 'w-16'} bg-background-dashboard dark:bg-gray-900 dark:text-white border-r border-gray-300 dark:border-gray-700 flex-shrink-0 overflow-y-auto transition-all duration-300`}>
      
      {/* Home */}
      <div className="m-2 rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center gap-3 p-3 text-blue-600 font-medium justify-center">
          <Home className="w-5 h-5" />
          {isSidebarExpanded && <span>Home</span>}
        </div>
      </div>

      {/* View Section */}
      <div className="m-2 rounded-lg bg-white dark:bg-gray-800 shadow">
        <div 
          className="flex items-center justify-between p-3 font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => isSidebarExpanded && toggleSection('view')}
        >
          <div className="flex items-center gap-3 justify-center w-full">
            <Eye className="w-5 h-5 text-gray-700 dark:text-white" />
            {isSidebarExpanded && <span className="text-gray-700 dark:text-white">View</span>}
          </div>
          {isSidebarExpanded && (expandedSections.view ? <ChevronUp className="w-4 h-4 text-gray-700 dark:text-white"/> : <ChevronDown className="w-4 h-4 text-gray-700 dark:text-white"/>)}
        </div>
        {expandedSections.view && isSidebarExpanded && (
          <div>
            <div className="flex items-center gap-2 p-2 pl-12 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <BarChart3 className="w-4 h-4" />
              <span>Sales Analytics</span>
            </div>
            <div className="flex items-center gap-2 p-2 pl-12 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <Receipt className="w-4 h-4" />
              <span>Transactions</span>
            </div>
            <div className="flex items-center gap-2 p-2 pl-12 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <FileText className="w-4 h-4" />
              <span>Billings</span>
            </div>
          </div>
        )}
      </div>

      {/* Manage Section */}
      <div className="m-2 rounded-lg bg-white dark:bg-gray-800 shadow">
        <div 
          className="flex items-center justify-between p-3 font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => isSidebarExpanded && toggleSection('manage')}
        >
          <div className="flex items-center gap-3 justify-center w-full">
            <Settings className="w-5 h-5 text-gray-700 dark:text-white" />
            {isSidebarExpanded && <span className="text-gray-700 dark:text-white">Manage</span>}
          </div>
          {isSidebarExpanded && (expandedSections.manage ? <ChevronUp className="w-4 h-4 text-gray-700 dark:text-white"/> : <ChevronDown className="w-4 h-4 text-gray-700 dark:text-white"/>)}
        </div>
        {expandedSections.manage && isSidebarExpanded && (
          <div>
            {[
              { icon: Package, label: "Vending Machines" },
              { icon: ShoppingCart, label: "Inventory" },
              { icon: Megaphone, label: "Advertisements" },
              { icon: CreditCard, label: "Membership Cards" },
              { icon: Percent, label: "Discounts" },
              { icon: Gift, label: "Coupons" },
              { icon: Users, label: "Users" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-2 pl-12 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Taxes */}
      <div className="m-2 rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center gap-3 p-3 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer justify-center">
          <Calculator className="w-5 h-5" />
          {isSidebarExpanded && <span>Taxes</span>}
        </div>
      </div>

      {/* Maintenance Section */}
      <div className="m-2 rounded-lg bg-white dark:bg-gray-800 shadow">
        <div 
          className="flex items-center justify-between p-3 font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => isSidebarExpanded && toggleSection('maintenance')}
        >
          <div className="flex items-center gap-3 justify-center w-full">
            <Wrench className="w-5 h-5 text-gray-700 dark:text-white" />
            {isSidebarExpanded && <span className="text-gray-700 dark:text-white">Maintenance</span>}
          </div>
          {isSidebarExpanded && (expandedSections.maintenance ? <ChevronUp className="w-4 h-4 text-gray-700 dark:text-white"/> : <ChevronDown className="w-4 h-4 text-gray-700 dark:text-white"/>)}
        </div>
        {expandedSections.maintenance && isSidebarExpanded && (
          <div>
            <div className="flex items-center gap-2 p-2 pl-12 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <ClipboardList className="w-4 h-4" />
              <span>Service Request</span>
            </div>
            <div className="flex items-center gap-2 p-2 pl-12 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
              <Box className="w-4 h-4" />
              <span>Spares</span>
            </div>
          </div>
        )}
      </div>

      {/* Franchise */}
      <div className="m-2 rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center gap-3 p-3 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer justify-center">
          <GitBranch className="w-5 h-5" />
          {isSidebarExpanded && <span>Franchise</span>}
        </div>
      </div>

      {/* Help */}
      <div className="m-2 rounded-lg bg-white dark:bg-gray-800 shadow">
        <div className="flex items-center gap-3 p-3 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer justify-center">
          <HelpCircle className="w-5 h-5" />
          {isSidebarExpanded && <span>Help</span>}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;