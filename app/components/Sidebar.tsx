import Link from "next/link";
import { auth } from "@/auth";
import { logoutUser } from "@/app/actions/auth";
import { LayoutDashboard, Receipt, LogOut, Wallet } from "lucide-react";

type SidebarProps = {
  activePage: "dashboard" | "expenses";
};

export default async function Sidebar({ activePage }: SidebarProps) {
  const session = await auth();

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white px-5 py-6 shadow-sm md:flex md:flex-col justify-between">
      <div>
        <div className="mb-8 px-3">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-black text-white shadow-md shadow-indigo-200">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 leading-tight">
                Expense Tracker
              </h1>
              <p className="text-[11px] font-medium text-slate-400">
                Personal Finance Hub
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
              activePage === "dashboard"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/expenses"
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-150 ${
              activePage === "expenses"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Receipt className="h-4 w-4" />
            Expenses
          </Link>
        </nav>
      </div>

      {/* User Profile & Logout Footer */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              {session?.user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-900">
                {session?.user?.name || "User"}
              </p>
              <p className="truncate text-[10px] text-slate-500">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>

          <form action={logoutUser}>
            <button
              type="submit"
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
