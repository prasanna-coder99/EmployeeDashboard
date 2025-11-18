import React, { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const SalesAnalysis = () => {
  const [activeTab, setActiveTab] = useState("Week");

  const data = [
    { day: "Sun", value: 200 },
    { day: "Mon", value: 150 },
    { day: "Tue", value: 400 },
    { day: "Wed", value: 850 },
    { day: "Thu", value: 800 },
    { day: "Fri", value: 900 },
    { day: "Sat", value: 350 },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-white p-4 w-[750px] h-[380px] mt-[2px] ml-[-32px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[16px] font-semibold text-slate-800 dark:text-white">
          Sales Analysis
        </h3>

        {/* Tabs + Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-50 dark:bg-gray-800 p-1 rounded-xl gap-1">
            {["Day", "Week", "Month"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`
                  px-4 py-1.5 text-[13px] font-medium rounded-lg transition
                  ${
                    activeTab === item
                      ? "bg-white dark:bg-gray-700 text-slate-800 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-white"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Arrow icon */}
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
              <rect width="50" height="50" rx="25" fill="#ECEDF8" />
              <path d="M30.3817 20.1389C30.3817 19.8512 30.1485 19.6181 29.8609 19.6181L25.1734 19.6181C24.8857 19.6181 24.6526 19.8512 24.6526 20.1389C24.6526 20.4265 24.8857 20.6597 25.1734 20.6597L29.3401 20.6597L29.3401 24.8264C29.3401 25.114 29.5732 25.3472 29.8609 25.3472C30.1485 25.3472 30.3817 25.114 30.3817 24.8264L30.3817 20.1389ZM20.507 30.2294L30.2292 20.5072L29.4926 19.7706L19.7704 29.4928L20.507 30.2294Z" fill="#654BF3"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-2">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#f1f5f9" strokeOpacity={0.3} vertical={false} className="dark:stroke-gray-700" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={10}
              className="dark:text-gray-300"
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              tickFormatter={(value) => `€ ${value}`}
              ticks={[0, 200, 400, 600, 800, 1000]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#colorValue)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAnalysis;
