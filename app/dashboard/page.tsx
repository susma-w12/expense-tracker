import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

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

  // Last 7 days
  const dailyData = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();

    date.setDate(date.getDate() - (6 - index));

    const amount = expenses
      .filter((expense) => {
        return expense.date.toDateString() === date.toDateString();
      })
      .reduce((total, expense) => total + expense.amount, 0);

    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      amount,
    };
  });

  // Spending by category
  const categoryMap: Record<string, number> = {};

  expenses.forEach((expense) => {
    categoryMap[expense.category] =
      (categoryMap[expense.category] || 0) + expense.amount;
  });

  const categoryData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar activePage="dashboard" />

        {/* Main Content */}
        <main className="flex-1 px-5 py-6 md:px-8 lg:px-10">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                Dashboard
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight">
                Good evening, {session.user.name}
              </h1>

              <p className="mt-1 text-gray-500">
                Here&apos;s an overview of your spending.
              </p>
            </div>

            <AddExpenseModal />
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {/* Total Spending */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Spending
              </p>

              <p className="mt-2 text-2xl font-bold">
                Rs. {totalAmount.toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                All time
              </p>
            </div>

            {/* This Month */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                This Month
              </p>

              <p className="mt-2 text-2xl font-bold">
                Rs. {thisMonthAmount.toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {thisMonthExpenses.length} transactions
              </p>
            </div>

            {/* Today */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Today
              </p>

              <p className="mt-2 text-2xl font-bold">
                Rs. {todayAmount.toFixed(2)}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Today&apos;s spending
              </p>
            </div>

            {/* Transactions */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                Transactions
              </p>

              <p className="mt-2 text-2xl font-bold">
                {expenses.length}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Total recorded expenses
              </p>
            </div>
          </div>

          {/* Charts */}
          <DashboardCharts
            dailyData={dailyData}
            categoryData={categoryData}
          />

          {/* Recent Expenses */}
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Recent Expenses
                </h2>

                <p className="text-sm text-gray-500">
                  Your latest spending activity
                </p>
              </div>

              <Link
                href="/expenses"
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                View all →
              </Link>
            </div>

            {expenses.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-gray-500">
                  No expenses recorded yet.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {expenses.slice(0, 5).map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between rounded-xl px-3 py-4 hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">
                        {expense.title}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {expense.category} ·{" "}
                        {expense.date.toLocaleDateString()}
                      </p>
                    </div>

                    <p className="font-semibold">
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