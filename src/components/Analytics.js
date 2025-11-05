import React from "react";
import {
  Line,
  Pie
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Analytics= () => {
 // Line Chart Data
const lineData = {
  labels: ["Nov 8","Nov 10", "Nov 12" ,"Nov 15","Nov 17","Nov 19", "Nov 22", "Nov 29"],
  datasets: [
    {
      label: "Visits",
      data: [0,30,10,0,50,30,70,50,10,70,0,30],
      borderColor: "#25C4F2", 
      backgroundColor: "rgba(37, 196, 242, 0.25)",
      pointBackgroundColor: "#FF6B6B", 
      pointBorderColor: "#fff",
      pointRadius: 8,
      pointHoverRadius: 7,
      fill: true,
      tension: 0, 
    },
  ],
};

// Line Chart Options
const lineOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#fff",
      titleColor: "#333",
      bodyColor: "#333",
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 8,
      displayColors: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max:100,
      grid: {
        color: "#E5E7EB",
      },
      ticks: {
        color: "#9CA3AF",
        stepSize:20,
        font: { size: 12 },
      },
    },
    x: {
      grid: { display: false },
      ticks: {
        color: "#9CA3AF",
        font: { size: 12 },
      },
    },
  },
  animation: {
    duration: 1000,
    easing: "easeInOutQuart",
  },
};


  // Pie Chart Data
  const pieData = {
    labels: ["Returning Visitors (21%)", "Unique Visitors (79%)"],
    datasets: [
      {
        data: [21, 79],
        backgroundColor: ["#F87171", "#2CD3E1"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans">
      {/* Header */}
      <div className="w-full bg-[#2CD3E1] text-white py-8 text-center text-lg font-semibold tracking-wide">
        ANALYTICS
      </div>

      {/* Stats Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 my-6">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="45"
                stroke="#E5E7EB"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="45"
                stroke="#2CD3E1"
                strokeWidth="6"
                strokeDasharray="282"
                strokeDashoffset="59"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-cyan-500">
              79%
            </span>
          </div>
          <p className="mt-2 text-gray-600">UNIQUE VISITORS</p>
        </div>
    

        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="45"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="45"
                stroke="#F87171"
                strokeWidth="6"
                strokeDasharray="282"
                strokeDashoffset="222"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-red-400">
              21%
            </span>
          </div>
          <p className="mt-2 text-gray-600">RETURNING VISITORS</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 mb-4 py-6 border-t border-b border-gray-300 ">
        {["Hourly", "Day", "Week", "Month"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-3xl font-medium ${
              tab === "Day"
                ? "bg-cyan-500 text-white"
                : "text-gray-600 hover:text-cyan-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Line Chart */}
      <div className="w-10/12 md:w-8/12 lg:w-6/12  p-4">

        <Line data={lineData} options={lineOptions} />
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center text-sm text-gray-600 mt-6 gap-4 divide-x divide-gray-600">
        <div className="text-center">
          <p className="font-semibold text-gray-800 text-lg">64</p>
          <p>VISITS</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-800 text-lg">23</p>
          <p className="px-2">UNIQUE VISITORS</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-800 text-lg">662</p>
          <p className="px-2">PAGEVIEWS</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-800 text-lg">10.34</p>
          <p className="px-2 text-center">PAGE / VISIT</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-gray-800 text-lg">00:07:03</p>
          <p className="px-2">AVG. VISIT DURATION</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="w-60 mt-8">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Analytics;
