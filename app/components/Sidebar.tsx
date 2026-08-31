import Link from "next/link";
import { auth } from "@/auth";

type SidebarProps = {
  activePage: "dashboard" | "expenses";
};

export default async function Sidebar({
  activePage,
}: SidebarProps) {
  const session = await auth();

  return (
    <aside className="hidden w-64 border-r bg-white px-5 py-6 md:flex md:flex-col">
      {/* Logo */}
      <div className="mb-10 px-3">
        <h1 className="text-xl font-bold">
          Expense Tracker
        </h1>

        <p className="mt-1 text-xs text-gray-500">
          Manage your spending
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium ${
            activePage === "dashboard"
              ? "bg-indigo-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/expenses"
          className={`flex items-center rounded-xl px-4 py-3 text-sm font-medium ${
            activePage === "expenses"
              ? "bg-indigo-600 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Expenses
        </Link>
      </nav>

      {/* Profile */}
      <div className="mt-auto border-t pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
            {session?.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {session?.user?.name}
            </p>

            <p className="truncate text-xs text-gray-500">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}