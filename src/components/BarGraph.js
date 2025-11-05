import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarGraph = () => {
  const data = {
    labels: ["Bronchopeumonia",
      "Capillarostasis",
      "Exudative phase",
      "Interstitial edema",
      "Microthrombi",
      "Proliferative phase",
      "Vasculitis",], 
    datasets: [
      {
        label: "Sales (in units)",
        data: [4, 2, 25, 22, 27, 10, 10], 
        backgroundColor: [ "#F87171",
          "#C49A00", 
          "#22C55E", 
          "#10B981", 
          "#A67C00", 
          "#A78BFA", 
          "#EC4899",], 
        borderRadius: 4, 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product Sales Comparison",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 ">
      <h2 className="text-2xl font-bold text-center mb-4">Bar Chart Example</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraph;
