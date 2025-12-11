export default function MetricCard({
  title,
  value,
  subtitle,
  change,
  icon,
  color,
}) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border">
      <div className={`text-4xl text-${color}-500`}>{icon}</div>
      <p className="font-medium text-neutral-700 mt-2">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
      <p className="text-neutral-500 text-sm">{subtitle}</p>
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
