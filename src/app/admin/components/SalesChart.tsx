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

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 Key fix
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border min-h-[380px] h-full">
      <h2 className="font-semibold text-neutral-800 mb-3">Sales Overview</h2>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
