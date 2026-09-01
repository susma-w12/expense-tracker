"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
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
import { TrendingUp, PieChart as PieIcon } from "lucide-react";

type ChartItem = {  
  label: string;
  amount: number;
};

type CategoryData = {
  name: string;
  value: number;
};

type Props = {
  dailyData: ChartItem[];
  monthlyData: ChartItem[];
  categoryData: CategoryData[];
};

const CATEGORY_COLORS = [
  "#6366f1", // Indigo
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#8b5cf6", // Purple
  "#06b6d4", // Cyan
  "#f97316", // Orange
  "#64748b", // Slate
];

export default function DashboardCharts({
  dailyData,
  monthlyData,
  categoryData,
}: Props) {
  const [timeframe, setTimeframe] = useState<"daily" | "monthly">("daily");

  const activeTrendData = timeframe === "daily" ? dailyData : monthlyData;
  const totalCategorySpending = categoryData.reduce(
    (acc, cur) => acc + cur.value,
    0
  );

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Spending Trend (Daily / Monthly) */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-3 flex flex-col justify-between">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                Spending Trends
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {timeframe === "daily"
                ? "Daily spending over the last 7 days"
                : "Monthly spending over the last 6 months"}
            </p>
          </div>

          {/* Timeframe Toggle Buttons */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 text-xs font-semibold text-slate-600 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTimeframe("daily")}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                timeframe === "daily"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "hover:text-slate-900"
              }`}
            >
              Daily (7D)
            </button>
            <button
              type="button"
              onClick={() => setTimeframe("monthly")}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                timeframe === "monthly"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "hover:text-slate-900"
              }`}
            >
              Monthly (6M)
            </button>
          </div>
        </div>

        {/* Chart View */}
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {timeframe === "daily" ? (
              <AreaChart data={activeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                  formatter={(value: unknown) => [`Rs. ${Number(value || 0).toFixed(2)}`, "Amount"]}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#indigoGradient)"
                />
              </AreaChart>
            ) : (
              <BarChart data={activeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                  formatter={(value: unknown) => [`Rs. ${Number(value || 0).toFixed(2)}`, "Amount"]}
                />
                <Bar dataKey="amount" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Overview Donut Chart */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <PieIcon className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-bold text-slate-900">
              Category Breakdown
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Overall distribution of your expenses
          </p>
        </div>

        {categoryData.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-xs font-medium text-slate-400">
            No spending data recorded
          </div>
        ) : (
          <div className="relative h-64 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }}
                  formatter={(value: unknown) => [
                    `Rs. ${Number(value || 0).toFixed(2)} (${(((Number(value) || 0) / (totalCategorySpending || 1)) * 100).toFixed(1)}%)`,
                    "Amount",
                  ]}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => (
                    <span className="text-xs font-medium text-slate-600">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
