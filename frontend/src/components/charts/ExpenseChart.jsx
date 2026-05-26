import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#ef4444",
  "#22c55e",
  "#f59e0b",
  "#06b6d4",
];

const ExpenseChart = ({
  transactions,
}) => {
  const expenses =
    transactions.filter(
      (t) => t.type === "expense"
    );

  const categoryData = {};

  expenses.forEach((item) => {
    if (
      categoryData[item.category]
    ) {
      categoryData[item.category] +=
        item.amount;
    } else {
      categoryData[item.category] =
        item.amount;
    }
  });

  const chartData = Object.entries(
    categoryData
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Expense Distribution
      </h2>

      <div className="h-80">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={120}
              label
            >
              {chartData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;