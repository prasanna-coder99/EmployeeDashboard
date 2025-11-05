import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { x: 2, Vivamus: 2, Arcu: 2 },
  { x: 4, Vivamus: 2.5, Arcu: 2 },
  { x: 6, Vivamus: 3, Arcu: 3.5 },
  { x: 8, Vivamus: 4, Arcu: 6 },
  { x: 10, Vivamus: 5, Arcu: 9 },
  { x: 12, Vivamus: 6.5, Arcu: 13 },
  { x: 14, Vivamus: 8, Arcu: 16 },
  { x: 16, Vivamus: 9, Arcu: 18 },
  { x: 18, Vivamus: 10, Arcu: 19 },
  { x: 20, Vivamus: 10.5, Arcu: 19.2 },
  { x: 22, Vivamus: 11, Arcu: 19 },
  { x: 24, Vivamus: 11, Arcu: 17.5 },
  { x: 26, Vivamus: 11.5, Arcu: 16 },
  { x: 28, Vivamus: 11.5, Arcu: 13 },
  { x: 30, Vivamus: 11.5, Arcu: 12 },
  { x: 32, Vivamus: 12, Arcu: 11.5 },
  { x: 34, Vivamus: 16, Arcu: 11 },
];

const LineChartCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg mt-10 p-8 w-full max-w-4xl">
      <h3 className="text-gray-600 text-lg font-medium mb-6">Porttitor</h3>
      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart 
            data={data} 
            margin={{ top: 20, right: 30, left: -15, bottom: 10 }}
          >
            <CartesianGrid 
              strokeDasharray="0" 
              stroke="#E8E8E8" 
              vertical={false}
            />

            <XAxis
              dataKey="x"
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#999999", fontSize: 12 }}
              ticks={[2, 6, 10, 14, 18, 22, 26, 30, 34]}
              domain={[0, 36]}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#999999", fontSize: 12 }}
              ticks={[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
              domain={[0, 20]}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "12px",
              }}
              cursor={false}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="plainline"
              wrapperStyle={{ 
                top: -5, 
                right: 0,
                fontSize: "12px",
                color: "#666"
              }}
              iconSize={20}
            />

            <Line
              type="monotone"
              dataKey="Vivamus"
              stroke="#5A7B8C"
              strokeWidth={2}
              dot={false}
              activeDot={false}
            />
            <Line
              type="monotone"
              dataKey="Arcu"
              stroke="#A8D8EA"
              strokeWidth={2.5}
              dot={(props) => {
                const { cx, cy, payload } = props;
                // Show dots at specific points
                if (payload.x === 6 || payload.x === 16 || payload.x === 26) {
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={4.5}
                      fill="white"
                      stroke="#A8D8EA"
                      strokeWidth={2.5}
                    />
                  );
                }
                return null;
              }}
              activeDot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;