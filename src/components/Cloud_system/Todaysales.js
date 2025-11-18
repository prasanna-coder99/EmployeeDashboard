import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const TodaySales = () => {
  return (
    <div className="p-4   dark:text-white min-h-screen flex justify-center items-start mt-[-15px]">
      <Card className="max-w-md w-full h-[380px] bg-white dark:bg-gray-900 dark:text-white shadow-sm rounded-lg ml-[-36px]">
        <CardHeader className="flex flex-row justify-between items-center pb-4 pt-6 px-6">
          <CardTitle className="text-base font-medium text-gray-900 dark:text-white">Today Sales</CardTitle>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
              <rect width="50" height="50" rx="25" fill="#ECEDF8"/>
              <path d="M30.3817 20.1389C30.3817 19.8512 30.1485 19.6181 29.8609 19.6181L25.1734 19.6181C24.8857 19.6181 24.6526 19.8512 24.6526 20.1389C24.6526 20.4265 24.8857 20.6597 25.1734 20.6597L29.3401 20.6597L29.3401 24.8264C29.3401 25.114 29.5732 25.3472 29.8609 25.3472C30.1485 25.3472 30.3817 25.114 30.3817 24.8264L30.3817 20.1389ZM20.507 30.2294L30.2292 20.5072L29.4926 19.7706L19.7704 29.4928L20.507 30.2294Z" fill="#654BF3"/>
            </svg>
          </button>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          <div className="relative flex justify-center items-center h-[160px] w-full">
            <svg viewBox="0 0 200 120" className="w-[220px] h-[130px]">
              <defs>
                <linearGradient id="salesGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ACF6B1" />
                  <stop offset="40%" stopColor="#ACF6B1" />
                  <stop offset="70%" stopColor="#4C33DB" />
                  <stop offset="100%" stopColor="#4C33DB" />
                </linearGradient>
              </defs>
              <path d="M 30 95 A 70 70 0 0 1 170 95" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round"/>
              <path d="M 30 95 A 70 70 0 0 1 170 95" fill="none" stroke="url(#salesGradient)" strokeWidth="10" strokeLinecap="round" strokeDasharray="220" strokeDashoffset="30"/>
            </svg>

            <div className="absolute text-center -translate-y-4">
              <div className="text-2xl font-bold text-slate-800 dark:text-white mt-14">€ 3562</div>
              <div className="text-xs text-slate-400 dark:text-gray-300">Today’s Sale</div>
            </div>
          </div>

          <div className="flex justify-center gap-10 w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500"></div>
                <span className="font-semibold text-slate-800 dark:text-white">€ 2387</span>
              </div>
              <div className="text-xs text-slate-400 dark:text-gray-300 pl-5">Membership card</div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="font-semibold text-slate-800 dark:text-white">€ 853</span>
              </div>
              <div className="text-xs text-slate-400 dark:text-gray-300 pl-5">Credit Card</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodaySales;
