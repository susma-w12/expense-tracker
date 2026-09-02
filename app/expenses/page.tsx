import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";
import AddExpenseModal from "@/app/components/AddExpenseModal";
import ExpenseList from "@/app/components/ExpenseList";

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">

        <Sidebar activePage="expenses" />

        <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-10 max-w-7xl mx-auto">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              
              <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Expense Management
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Filter, search, and manage all your spending entries.
              </p>
            </div>

            <AddExpenseModal />
          </div>

          <ExpenseList initialExpenses={expenses} />
        </main>
      </div>
    </div>
  );
}
