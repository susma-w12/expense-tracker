import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";
import DeleteButton from "@/app/components/DeleteButton";
import AddExpenseModal from "@/app/components/AddExpenseModal";
import EditExpenseModal from "@/app/components/EditExpenseModal";

export default async function ExpensePage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar activePage="expenses" />

        {/* Main content */}
        <main className="flex-1 px-5 py-6 md:px-8 lg:px-10">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                Expense Management
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                All Expenses
              </h1>

              <p className="mt-2 text-gray-500">
                View and manage all your recorded expenses.
              </p>
            </div>

            <AddExpenseModal />
          </div>

          {/* Expense list */}
          {expenses.length === 0 ? (
            <div className="rounded-2xl border border-dashed bg-white p-12 text-center shadow-sm">
              <h2 className="text-lg font-semibold">
                No expenses yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Start tracking your spending by adding your first
                expense.
              </p>

              <div className="mt-5">
                <AddExpenseModal />
              </div>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

              {/* Table header */}
              <div className="hidden grid-cols-5 gap-4 border-b bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500 md:grid">
                <span>Expense</span>
                <span>Category</span>
                <span>Amount</span>
                <span>Date</span>
                <span className="text-right">Actions</span>
              </div>

              {/* Expenses */}
              <div>
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="grid gap-4 border-b px-6 py-5 last:border-b-0 md:grid-cols-5 md:items-center"
                  >

                    {/* Expense */}
                    <div>
                      <h2 className="font-semibold">
                        {expense.title}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        {expense.description || "No description"}
                      </p>
                    </div>

                    {/* Category */}
                    <div>
                      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                        {expense.category}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="font-semibold">
                      Rs. {expense.amount.toFixed(2)}
                    </div>

                    {/* Date */}
                    <div className="text-sm text-gray-500">
                      {expense.date.toLocaleDateString()}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 md:justify-end">
                      <EditExpenseModal expense={expense} />

                      <DeleteButton id={expense.id} />
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}