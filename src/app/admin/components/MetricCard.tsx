type MetricCardProps = {
  title: string;
  value: string | number;
  subtitle: string;
  change: string;
  icon: string;
  color: "orange" | "blue" | "purple" | "green" | string;
};

export default function MetricCard({
  title,
  value,
  subtitle,
  change,
  icon,
  color,
}: MetricCardProps) {
  const colorMap: Record<string, string> = {
    orange: "text-orange-500",
    blue: "text-blue-500",
    purple: "text-purple-500",
    green: "text-green-500",
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border">
      <div className={`text-4xl ${colorMap[color] || ""}`}>{icon}</div>

      <p className="font-medium text-neutral-800 mt-2">{title}</p>
      <h2 className="text-2xl font-bold mt-1 text-neutral-900">{value}</h2>
      <p className="text-neutral-700 text-sm">{subtitle}</p>

      <p
        className={`text-sm mt-1 ${
          change.startsWith("-") ? "text-red-600" : "text-green-600"
        }`}
      >
        {change}
      </p>
    </div>
  );
}
