import React from "react";
import { Snowflake, Flame, Droplet } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const MachineStatus = () => {
  const machines = [
    {
      location: "Munich",
      hasDot: true,
      number: "237886989",
      temperature: "-2°C to 5°C",
      tempType: "cold",
      tempColor: "text-indigo-500",
      humidity: "27",
      humidityType: "high",
      humidityColor: "text-red-500",
      status: "Inactive",
      statusColor: "bg-yellow-500",
      condition: "Abnormal",
    },
    {
      location: "Frankfurt",
      hasDot: true,
      number: "878934489",
      temperature: "-1°C to 3°C",
      tempType: "hot",
      tempColor: "text-red-500",
      humidity: "24",
      humidityType: "high",
      humidityColor: "text-red-500",
      status: "Active",
      statusColor: "bg-green-500",
      condition: "Abnormal",
    },
    {
      location: "Berlin",
      hasDot: false,
      number: "334478945",
      temperature: "-2°C to 5°C",
      tempType: "cold",
      tempColor: "text-indigo-500",
      humidity: "27",
      humidityType: "normal",
      humidityColor: "text-blue-500",
      status: "Active",
      statusColor: "bg-green-500",
      condition: "Normal",
    },
    {
      location: "Frankfurt",
      hasDot: false,
      number: "878934489",
      temperature: "-1°C to 3°C",
      tempType: "cold",
      tempColor: "text-indigo-500",
      humidity: "24",
      humidityType: "normal",
      humidityColor: "text-blue-500",
      status: "Active",
      statusColor: "bg-green-500",
      condition: "Normal",
    },
    {
      location: "Munich",
      hasDot: false,
      number: "2378869897",
      temperature: "-2°C to 5°C",
      tempType: "cold",
      tempColor: "text-indigo-500",
      humidity: "27",
      humidityType: "normal",
      humidityColor: "text-blue-500",
      status: "Active",
      statusColor: "bg-green-500",
      condition: "Normal",
    },
  ];

  return (
    <Card className="rounded-lg shadow-sm bg-white dark:bg-gray-900 dark:text-white dark:border-white border mt-4 w-[750px] h-[400px] translate-x-[-36px]">
      <CardContent className="px-3 py-4">
        {/* Header */}
        <div className="flex justify-between items-center h-1 mb-4 ">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white pt-4 mt-6">
            Machine Status
          </h3>
          <button className="mt-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <rect width="50" height="50" rx="25" fill="#ECEDF8" />
              <path
                d="M30.3817 20.1389C30.3817 19.8512 30.1485 19.6181 29.8609 19.6181L25.1734 19.6181C24.8857 19.6181 24.6526 19.8512 24.6526 20.1389C24.6526 20.4265 24.8857 20.6597 25.1734 20.6597L29.3401 20.6597L29.3401 24.8264C29.3401 25.114 29.5732 25.3472 29.8609 25.3472C30.1485 25.3472 30.3817 25.114 30.3817 24.8264L30.3817 20.1389ZM20.507 30.2294L30.2292 20.5072L29.4926 19.7706L19.7704 29.4928L20.507 30.2294Z"
                fill="#654BF3"
              />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto ">
          <table className="max-w-lg w-full mt-5 py-5 mt-10  rounded-md">
            <thead>
              <tr className="text-sm text-slate-600 dark:text-gray-300 border-y dark:border-white">
                <th className="pb-2 text-left px-3 py-2">Location</th>
                <th className="pb-2 text-left px-3 py-2">Number</th>
                <th className="pb-2 text-left px-3 py-2">Temperature</th>
                <th className="pb-2 text-left px-3 py-2">Humidity</th>
                <th className="pb-2 text-left px-3 py-2">Status</th>
                <th className="pb-2 text-left px-3 py-2">Condition</th>
                <th className="pb-1"></th>
              </tr>
            </thead>

            <tbody>
              {machines.map((machine, index) => (
                <tr
                  key={index}
                  className={`hover:bg-slate-100 dark:hover:bg-gray-800 ${
                    index >= 1
                      ? index % 2 === 1
                        ? "bg-background-dashboard dark:bg-gray-900" // index 1,3,5
                        : "bg-white dark:bg-gray-800" // index 2,4,6
                      : ""
                  }`}
                >
                  {/* LOCATION */}
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2 text-slate-800 dark:text-white font-medium">
                      {machine.hasDot && <span className="w-2 h-2 rounded-full bg-red-500" />}
                      {machine.location}
                    </div>
                  </td>

                  {/* NUMBER */}
                  <td className="py-2 px-4 text-slate-700 dark:text-gray-300">{machine.number}</td>

                  {/* TEMP */}
                  <td className="py-2">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                      {machine.tempType === "cold" ? (
                        <Snowflake className={`w-4 h-4 ${machine.tempColor}`} />
                      ) : (
                        <Flame className={`w-4 h-4 ${machine.tempColor}`} />
                      )}
                      {machine.temperature}
                    </div>
                  </td>

                  {/* HUMIDITY */}
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-gray-300">
                      <Droplet
                        className={`w-4 h-4 ${machine.humidityColor} ${
                          machine.humidityType === "high" ? "fill-current" : "fill-none"
                        }`}
                      />
                      {machine.humidity}
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="py-2 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${machine.statusColor}`} />
                      {machine.status}
                    </div>
                  </td>

                  {/* CONDITION */}
                  <td className="py-2 px-4 text-slate-700 dark:text-gray-300">{machine.condition}</td>

                  {/* VIEW BUTTON */}
                  <td className="py-2 px-4">
                    <Button
                      variant="outline"
                      className={`rounded-full px-4 py-1 text-xs font-medium border-slate-300 dark:border-gray-600 ${
                        index < 2
                          ? "bg-black dark:bg-white text-white dark:text-black hover:bg-black "
                          : ""
                      } hover:bg-slate-900 hover:text-white`}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MachineStatus;
