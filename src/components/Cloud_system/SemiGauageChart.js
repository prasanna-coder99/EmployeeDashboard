// components/charts/SemiGaugeChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SemiGauageChart = () => {
  const data = {
    labels: ["Membership", "Credit"],
    datasets: [
      {
        data: [2387, 853],
        backgroundColor: ["#4C33DB", "#ACF6B1"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: "70%",
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: "220px", height: "130px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SemiGauageChart;
