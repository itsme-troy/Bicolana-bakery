"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryChart() {
  const data = {
    labels: ["Bread", "Cakes", "Cookies", "Pastries"],
    datasets: [
      {
        data: [35, 30, 15, 20],
        backgroundColor: ["#fb923c", "#fdba74", "#fed7aa", "#f97316"],
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 Prevents giant donut
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 min-h-[380px] h-full">
      <h2 className="font-semibold text-neutral-800 mb-2">Sales by Category</h2>
      <p className="text-neutral-700 text-sm mb-4">Distribution</p>

      <div className="h-[280px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
