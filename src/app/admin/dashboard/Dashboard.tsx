"use client";

import MetricCard from "../components/MetricCard";
import SalesChart from "../components/SalesChart";
import CategoryChart from "../components/CategoryChart";

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-neutral-500">Welcome back, Admin</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$14,234.50"
          subtitle="Last 7 days"
          change="+12.5%"
          color="orange"
          icon="💵"
        />
        <MetricCard
          title="Total Orders"
          value="314"
          subtitle="Last 7 days"
          change="+8.2%"
          color="blue"
          icon="🛒"
        />
        <MetricCard
          title="Products"
          value="156"
          subtitle="3 low stock items"
          change="-3.1%"
          color="purple"
          icon="📦"
        />
        <MetricCard
          title="Customers"
          value="2,847"
          subtitle="+124 this week"
          change="+15.3%"
          color="green"
          icon="👥"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        <CategoryChart />
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="font-semibold mb-2">Top Products</h2>
          <p className="text-neutral-500 text-sm mb-4">
            Best sellers this week
          </p>

          {[
            { name: "Sourdough Bread", sold: 156, revenue: "$934.44" },
            { name: "Chocolate Cake", sold: 89, revenue: "$2223.11" },
            { name: "Croissant", sold: 234, revenue: "$933.66" },
            { name: "Blueberry Muffin", sold: 178, revenue: "$801.00" },
            { name: "Red Velvet Cake", sold: 67, revenue: "$1942.33" },
          ].map((p, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-3 border-b last:border-none"
            >
              <div className="flex items-center gap-3">
                <span className="bg-orange-100 text-orange-600 w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-neutral-500 text-sm">{p.sold} sold</p>
                </div>
              </div>

              <p className="font-semibold">{p.revenue}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="font-semibold mb-2">Recent Activity</h2>
          <p className="text-neutral-500 text-sm mb-4">Latest updates</p>

          {[
            {
              text: "New order #ORD-001 from Sarah Johnson",
              time: "5 min ago",
              color: "blue",
            },
            {
              text: "Low stock alert: Croissants (5 remaining)",
              time: "12 min ago",
              color: "orange",
            },
            {
              text: "Order #ORD-002 marked as completed",
              time: "23 min ago",
              color: "blue",
            },
            {
              text: "New customer registered: Michael Chen",
              time: "1 hour ago",
              color: "green",
            },
            {
              text: "New order #ORD-003 from Emily Davis",
              time: "2 hours ago",
              color: "blue",
            },
          ].map((a, i) => (
            <div key={i} className="flex items-start gap-3 py-3">
              <span
                className={`w-3 h-3 rounded-full mt-1 ${
                  a.color === "blue"
                    ? "bg-blue-500"
                    : a.color === "orange"
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
              ></span>
              <div>
                <p className="font-medium">{a.text}</p>
                <p className="text-neutral-500 text-xs">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
