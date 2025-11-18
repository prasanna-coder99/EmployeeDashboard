import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const InventoryLevel = () => {
  const inventoryItems = [
    { name: "Blue Station", id: "2336879299", percentage: 16.6, color: "#ef4444", badge: "Low", bgColor: "#fee2e2" },
    { name: "Airport Lounge", id: "3543422098", percentage: 24.16, color: "#ef4444", badge: "Low", bgColor: "#fee2e2" },
    { name: "Railway Station", id: "6343434322", percentage: 33.47, color: "#f59e0b", badge: "Medium", bgColor: "#fef3c7" },
  ];

  return (
    <div className="w-[500px] dark:bg-gray-900 dark:text-white">
      <Card className="rounded-lg max-w-md w-full h-[400px] bg-white dark:bg-gray-900 dark:text-white mt-[-320px] ml-2">
        <CardHeader className="flex flex-row justify-between items-center pb-4 pt-6 px-4">
          <CardTitle className="text-base font-medium text-gray-900 dark:text-white">Inventory Level</CardTitle>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
              <rect width="50" height="50" rx="25" fill="#ECEDF8" />
              <path d="M30.3817 20.1389C30.3817 19.8512 30.1485 19.6181 29.8609 19.6181L25.1734 19.6181C24.8857 19.6181 24.6526 19.8512 24.6526 20.1389C24.6526 20.4265 24.8857 20.6597 25.1734 20.6597L29.3401 20.6597L29.3401 24.8264C29.3401 25.114 29.5732 25.3472 29.8609 25.3472C30.1485 25.3472 30.3817 25.114 30.3817 24.8264L30.3817 20.1389ZM20.507 30.2294L30.2292 20.5072L29.4926 19.7706L19.7704 29.4928L20.507 30.2294Z" fill="#654BF3"/>
            </svg>
          </button>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {inventoryItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 bg-background-dashboard dark:bg-gray-800 py-4 px-4 rounded-md">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-slate-800 dark:text-white">
                  {item.name} <span className="font-normal text-slate-400 dark:text-gray-300">- {item.id}</span>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: item.bgColor, color: item.color }}
                >
                  {item.badge}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-full h-2 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
                <span className="text-xs font-semibold" style={{ color: item.color }}>
                  {item.percentage.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryLevel;
