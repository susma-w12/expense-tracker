"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type DailyData = {
  date: string;
  amount: number;
};

type CategoryData = {
  name: string;
  value: number;
};

type Props = {
  dailyData: DailyData[];
  categoryData: CategoryData[];
};

const COLORS = [
  "#6366f1",
  "#f97316",
  "#22c55e",
  "#ec4899",
  "#eab308",
  "#06b6d4",
];

export default function DashboardCharts({
  dailyData,
  categoryData,
}: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Daily Spending */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-3">
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Daily Spending</h2>
          <p className="text-sm text-gray-500">
            Your spending over the last 7 days
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                formatter={(value) => [`Rs. ${value}`, "Spending"]}
              />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Overview */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Spending Overview</h2>
          <p className="text-sm text-gray-500">
            Expenses by category
          </p>
        </div>

        {categoryData.length === 0 ? (
          <div className="flex h-72 items-center justify-center text-sm text-gray-500">
            No spending data yet
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) => [`Rs. ${value}`, "Amount"]}
                />

                <Legend
                  verticalAlign="bottom"
                  height={36}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}