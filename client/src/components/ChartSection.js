import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ChartSection({ invoices }) {

  // 🔥 Safety check
  if (!invoices || !Array.isArray(invoices)) {
    return <p>Loading chart...</p>;
  }

  const monthlyData = {};

  invoices.forEach((inv) => {

    if (!inv.uploadedAt) return;

    const date = new Date(inv.uploadedAt);

    const month = date.toLocaleString("default", {
      month: "short"
    });

    monthlyData[month] = (monthlyData[month] || 0) + 1;

  });

  const chartData = Object.keys(monthlyData).map((month) => ({
    month,
    uploads: monthlyData[month]
  }));

  return (
    <div className="chart-container">

      <h2>Monthly Upload Activity</h2>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="uploads" fill="#4f46e5" />
          <Bar dataKey="count" barSize={20} radius="{[4,4,0,0]}" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ChartSection;
