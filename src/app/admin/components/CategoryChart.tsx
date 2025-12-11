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

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 h-[350px]">
      <h2 className="font-semibold mb-2">Sales by Category</h2>
      <p className="text-neutral-500 text-sm mb-4">Distribution</p>
      <Doughnut data={data} />
    </div>
  );
}
