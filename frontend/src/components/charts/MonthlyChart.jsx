import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MonthlyChart = ({
  data,
}) => {

  const formattedData =
    data.map((item) => ({
      month:
        `${item._id.month}/${item._id.year}`,

      total: item.total,

      type: item._id.type,
    }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Monthly Trends
      </h2>

      <div className="h-96">
        <ResponsiveContainer>
          <LineChart
            data={formattedData}
          >
            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="total"
              stroke="#6366f1"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyChart;