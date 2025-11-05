import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  CartesianGrid ,
} from "recharts";

const HrDashboard = () => {
  // Sample Data - matching the image pattern
  const avgTimeData = [
    { name: "", value: 6 },
    { name: "", value:9 },
    { name: "", value: 12 },
    { name: "", value:  9},
    { name: "", value:  5},
    { name: "", value:  6},
    { name: "", value: 3},
  ];

  const turnoverData = [
    { name: "", joined: 5, left: 2 },
    { name: "", joined: 7, left: 4},
    { name: "", joined: 4, left: 2 },
    { name: "", joined: 2, left: 1 },
    { name: "", joined: 4, left: 3 },
    { name: "", joined: 5, left: 2 },
    { name: "", joined:6,  left: 3},
  ];

  const satisfactionData = [
  { day: 1, satisfaction1: 2500, satisfaction2: 1100 },
  { day: 2, satisfaction1: 2800, satisfaction2: 1100 },
  { day: 3, satisfaction1: 3000, satisfaction2: 1050 },
  { day: 4, satisfaction1: 3000, satisfaction2: 1200 },
  { day: 5, satisfaction1: 3000, satisfaction2: 1300 },
   { day: 6, satisfaction1: 2800, satisfaction2:1400 },
  { day: 7, satisfaction1: 2700, satisfaction2: 1700 },
   { day: 8, satisfaction1: 3200, satisfaction2: 1800 },
  { day: 9, satisfaction1: 2200, satisfaction2: 2000 },
   { day: 10, satisfaction1: 2600, satisfaction2:2000 },
  { day: 11, satisfaction1: 3000, satisfaction2: 1900 },
   { day: 12, satisfaction1: 3200, satisfaction2: 1800 },
  { day: 13, satisfaction1: 3300, satisfaction2: 1500 },
  { day: 14, satisfaction1: 3300, satisfaction2: 2000 },
   { day: 15, satisfaction1:3200, satisfaction2: 1800 },
  { day: 16, satisfaction1: 2200, satisfaction2: 1800 },
  { day: 18, satisfaction1: 2100, satisfaction2: 1700 },
  { day: 19, satisfaction1: 2100, satisfaction2: 1600 },
  { day: 20, satisfaction1: 2200, satisfaction2:  1000},
  { day: 21, satisfaction1: 2200, satisfaction2: 1200 },
   { day:22, satisfaction1: 3000, satisfaction2:1300 },
  { day: 23, satisfaction1: 2800, satisfaction2: 1300 },
   { day: 24, satisfaction1:2500, satisfaction2: 1400 },
  { day: 25, satisfaction1: 2600, satisfaction2: 1200 },
  { day: 26, satisfaction1: 2800, satisfaction2: 1200 },
   { day: 27, satisfaction1: 3200, satisfaction2: 800 },
  { day: 28, satisfaction1: 3000, satisfaction2: 900 },
  { day: 29, satisfaction1: 2300, satisfaction2: 1000},
  { day: 30, satisfaction1: 2200, satisfaction2: 1200},
  
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
  {/* Header Section */}
  <div className="mb-8">
    {/* Title */}
    <h1 className="text-2xl font-bold text-gray-800 mb-4">HR Dashboard</h1>

    {/* Filters Row */}
    <div className="flex flex-wrap gap-4 items-center">
      {/* Date Range */}
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm text-gray-700 shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-2 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v1.5M17.25 3v1.5M3 8.25h18M4.5 6.75v12.75A1.5 1.5 0 006 21h12a1.5 1.5 0 001.5-1.5V6.75"
          />
        </svg>
        <select className="focus:outline-none bg-transparent">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Services Dropdown */}
      <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
        <option>All Services</option>
        <option>Recruitment</option>
        <option>Training</option>
        <option>Payroll</option>
      </select>

      {/* Posts Dropdown */}
      <select className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
        <option>All Posts</option>
        <option>HR Manager</option>
        <option>HR Executive</option>
        <option>Intern</option>
      </select>
    </div>
  </div>



      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Side Charts - Takes 3 columns */}
        <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Avg Time to Hire */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Avg Time to Hire</h2>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={avgTimeData} barSize={32}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                />
                <YAxis  domain={[0,12]}
                ticks={[0,3,6,9,12]}
                axisLine={false}
                tickLine={false}
                tick={{fill:"#9CA3AF", fontSize:12}} />
                 <CartesianGrid 
                 horizontal={true} 
                 vertical={false} 
                 stroke="#E5E7EB" 
                 strokeDasharray="3 3" 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#A855F7" 
                  radius={[0, 0, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Employee Turnover */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Employee Turnover Rate</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={turnoverData} barSize={32}>
                <XAxis 
                 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  
                />
                <YAxis  domain={[0,12]}
                ticks={[0,3,6,9,12]}
                interval={0}
                axisLine={false}
                tickLine={false}
                tick={{fill:"#9CA3AF", fontSize:12}} />
                 <CartesianGrid 
                 horizontal={true} 
                 vertical={false} 
                 stroke="#E5E7EB" 
                 strokeDasharray="3 3" 
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                />
                <Bar 
                  dataKey="joined" 
                  stackId="a"
                  fill="#3B82F6" 
                  radius={[0, 0, 0, 0]}
                  name="Joined"
                />
                <Bar 
                  dataKey="left" 
                  stackId="a"
                  fill="#10B981" 
                  radius={[0, 0, 0, 0]}
                  name="Left"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Employee Satisfaction - Full Width */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Employee Satisfaction</h2>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={satisfactionData}>
                <XAxis
                  type="number"
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  ticks={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]} 
                  interval={0}
                />
                <YAxis domain={[0,4000]} />
                <CartesianGrid 
                 horizontal={true} 
                 vertical={false} 
                 stroke="#E5E7EB" 
                 strokeDasharray="3 3" 
                />
                <Tooltip 
                  cursor={{ stroke: '#93C5FD', strokeWidth: 1, strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    background: 'white', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
                <defs>
                  <linearGradient id="colorSatisfaction1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#93C5FD" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorSatisfaction2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C4B5FD" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#C4B5FD" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <Area
                  type="basis"
                  dataKey="satisfaction1"
                  stroke="#60A5FA"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSatisfaction1)"
               
                />
                <Area
                  type="basis"
                  dataKey="satisfaction2"
                  stroke="#A78BFA"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSatisfaction2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      {/* Right Side Stats - Takes 1 column */}
        <div className="flex flex-col gap-6">
          {/* Avg Time to Hire Stat */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Avg Time to Hire</p>
            <h2 className="text-5xl font-bold text-gray-800 mb-2">33</h2>
            <div className="flex items-center gap-1 mb-3">
              <span className="text-red-500 text-sm">▲</span>
              <span className="text-red-500 text-sm font-medium">13%</span>
            </div>
            <p className="text-xs text-gray-400">vs previous 7 days</p>
          </div>

          {/* Employee Turnover Stat */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Employee Turnover Rate</p>
            <h2 className="text-5xl font-bold text-gray-800 mb-2">5.2%</h2>
            <div className="flex items-center gap-1 mb-3">
              
              <span className="text-green-500 text-sm font-medium">8%</span>
            </div>
            <p className="text-xs text-gray-400">vs previous 7 days</p>
          </div>

          {/* Employee Satisfaction Stat */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Employee Satisfaction Rate</p>
            <h2 className="text-5xl font-bold text-gray-800 mb-2">86.2%</h2>
            <div className="flex items-center gap-1 mb-3">
              
              <span className="text-green-500 text-sm font-medium">1</span>
            </div>
            <p className="text-xs text-gray-400">vs previous 7 days</p>
          </div>

          {/* Number of Employees Stat */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Number of Employees</p>
            <h2 className="text-5xl font-bold text-gray-800 mb-2">153</h2>
            <div className="flex items-center gap-1 mb-3">
             
              <span className="text-green-500 text-sm font-medium">2</span>
            </div>
            <p className="text-xs text-gray-400">vs previous 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;