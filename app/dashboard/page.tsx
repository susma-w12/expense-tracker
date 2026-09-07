import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Wallet, Calendar, TrendingUp, Receipt, ArrowRight } from "lucide-react";

import Sidebar from "@/app/components/Sidebar";
import AddExpenseModal from "@/app/components/AddExpenseModal";
import DashboardCharts from "@/app/components/DashboardCharts";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = Number(session.user.id);

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });

  // Total spending
  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const now = new Date();

  // This month's expenses
  const thisMonthExpenses = expenses.filter((expense) => {
    return (
      expense.date.getMonth() === now.getMonth() &&
      expense.date.getFullYear() === now.getFullYear()
    );
  });

  const thisMonthAmount = thisMonthExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Today's spending
  const todayAmount = expenses
    .filter((expense) => {
      return expense.date.toDateString() === now.toDateString();
    })
    .reduce((total, expense) => total + expense.amount, 0);

  // Last 7 days daily data
  const dailyData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    const amount = expenses
      .filter((expense) => {
        return expense.date.toDateString() === date.toDateString();
      })
      .reduce((total, expense) => total + expense.amount, 0);

    return {
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      amount,
    };
  });

  // Last 6 months trend
  const monthlyData = Array.from({ length: 6 }, (_, index) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (5 - index));

    const amount = expenses
      .filter((expense) => {
        return (
          expense.date.getMonth() === d.getMonth() &&
          expense.date.getFullYear() === d.getFullYear()
        );
      })
      .reduce((total, expense) => total + expense.amount, 0);

    return {
      label: d.toLocaleDateString("en-US", { month: "short" }),
      amount,
    };
  });

  // Spending by category
  const categoryMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) + expense.amount;
  });

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">

        <Sidebar activePage="dashboard" />
       
        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 md:ml-64 max-w-7xl mx-auto">
         
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Dashboard Overview
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back, {session.user.name}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Here is your financial summary and recent spending.
              </p>
            </div>

            <AddExpenseModal />
          </div>

          {/* Compact Summary Cards */}
          <div className="mb-6 grid gap-4 grid-cols-2 lg:grid-cols-4">
            {/* Total Spending */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">
                  Total Spending
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Wallet className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Rs. {totalAmount.toFixed(2)}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                Lifetime expenses
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">
                  This Month
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Calendar className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Rs. {thisMonthAmount.toFixed(2)}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                {thisMonthExpenses.length} transactions
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">
                  Today
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-xl font-bold text-slate-900">
                Rs. {todayAmount.toFixed(2)}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                Today&apos;s spending
              </p>
            </div>

            {/* Total Transactions */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-500">
                  Transactions
                </p>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <Receipt className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-xl font-bold text-slate-900">
                {expenses.length}
              </p>
              <p className="mt-1 text-[11px] font-medium text-slate-400">
                all transactions
              </p>
            </div>
          </div>

          {/* Dynamic Charts Section */}
          <DashboardCharts
            dailyData={dailyData}
            monthlyData={monthlyData}
            categoryData={categoryData}
          />

          {/* Recent Expenses List */}
          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Recent Expenses
                </h2>
                <p className="text-xs text-slate-500">
                  Latest activity from your record
                </p>
              </div>

              <Link
                href="/expenses"
                className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                View all expenses <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {expenses.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No expenses recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {expenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between py-3 px-2 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm  text-slate-900">
                            {expense.title}
                          </p>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                            {expense.category}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {new Date(expense.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-900">
                      Rs. {expense.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
