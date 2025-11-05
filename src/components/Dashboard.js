import React from "react";
import SideBar from "./SideBar";
import OverViewCard from "./OverViewCard";
import LineChartCard from "./LineChartCard";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-xl font-semibold mb-6 text-sky-700 py-8 px-8 bg-white rounded-lg shadow-lg">OVERVIEW</h1>
        <OverViewCard/>
        <LineChartCard />
      </div>
    </div>
  );
};

export default Dashboard;
