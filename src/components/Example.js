// PieChart.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Example = () => {
  const data = {
    labels: ["Rent", "Food", "Travel", "Entertainment"],
    datasets: [
      {
        label: "Monthly Expenses",
        data: [1200, 500, 300, 200],
        backgroundColor: ["#F87171", "#60A5FA", "#34D399", "#FBBF24"],
        borderColor: ["#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Monthly Expenses</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default Example;
