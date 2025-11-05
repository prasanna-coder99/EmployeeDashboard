import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ChartDataLabels);


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: [
      "Bronchopeumonia",
      "Capillarostasis",
      "Exudative phase",
      "Interstitial edema",
      "Microthrombi",
      "Proliferative phase",
      "Vasculitis",
    ],
    datasets: [
      {
        data: [4, 2, 25, 22, 27, 10, 10],
        backgroundColor: [
          "#F87171", // Bronchopeumonia
          "#C49A00", // Capillarostasis
          "#22C55E", // Exudative phase
          "#10B981", // Interstitial edema
          "#A67C00", // Microthrombi
          "#A78BFA", // Proliferative phase
          "#EC4899", // Vasculitis
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 15,
          padding: 20,
          font: { size: 14 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.chart._metasets[0].total;
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1) + "%";
            return `${context.label}: ${percentage}`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8  mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Lung Pattern Distribution
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
