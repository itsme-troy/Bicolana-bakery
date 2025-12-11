"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

// REGISTER EVERYTHING REQUIRED FOR LINE CHART
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function SalesChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1800, 1600, 2400, 2700, 3100, 2300],
        tension: 0.4,
        borderColor: "#f97316",
        backgroundColor: "#f97316",
        borderWidth: 3,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border h-[350px]">
      <h2 className="font-semibold mb-3">Sales Overview</h2>
      <Line data={data} />
    </div>
  );
}
