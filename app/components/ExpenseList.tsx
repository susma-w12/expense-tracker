"use client";

import { useState, useMemo } from "react";
import EditExpenseModal from "./EditExpenseModal";
import DeleteButton from "./DeleteButton";
import {
  Search,
  Filter,
  Calendar,
  Layers,
} from "lucide-react";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  description: string | null;
  date: Date;
};

type Props = {
  initialExpenses: Expense[];
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  Food: { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500" },
  Transport: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", dot: "bg-blue-500" },
  Bills: { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" },
  Shopping: { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", dot: "bg-purple-500" },
  Entertainment: { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", dot: "bg-pink-500" },
  Other: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200", dot: "bg-slate-400" },
};

export default function ExpenseList({ initialExpenses }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract all unique categories present in the user's data + standard categories
  const categories = useMemo(() => {
    const defaultList = ["All", "Food", "Transport", "Bills", "Shopping", "Entertainment", "Other"];
    const customList = Array.from(new Set(initialExpenses.map((e) => e.category)));
    const combined = Array.from(new Set([...defaultList, ...customList]));
    return combined;
  }, [initialExpenses]);

  // Filtered expenses based on category & search query
  const filteredExpenses = useMemo(() => {
    return initialExpenses.filter((expense) => {
      const matchesCategory =
        selectedCategory === "All" ||
        expense.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (expense.description &&
          expense.description.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [initialExpenses, selectedCategory, searchQuery]);

  const filteredTotal = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  }, [filteredExpenses]);

  return (
    <div className="space-y-6">
      {/* Controls & Filter Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm space-y-4">
        {/* Top bar: Search input & total badge */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search expenses"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 px-1">
            <span className="text-xs font-medium text-slate-500">
              Filtered Total:
            </span>
            <span className="rounded-xl bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
              Rs. {filteredTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          <span className="flex items-center gap-1 font-semibold text-slate-400 mr-1.5 shrink-0">
            <Filter className="h-3.5 w-3.5" /> Category:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-xl px-3.5 py-1.5 font-semibold transition-all duration-150 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Expense Items List */}
      {filteredExpenses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-3">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No expenses found
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery || selectedCategory !== "All"
              ? "No expenses match your current filters. Try resetting category or search filters."
              : "You haven't recorded any expenses yet. Click '+ Add Expense' to get started."}
          </p>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden divide-y divide-slate-100">
          {/* List Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-slate-50/80 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className="col-span-4">Expense Details</span>
            <span className="col-span-3">Category</span>
            <span className="col-span-2">Date</span>
            <span className="col-span-2 text-right">Amount</span>
            <span className="col-span-1 text-right">Actions</span>
          </div>

          {/* List Content Rows */}
          {filteredExpenses.map((expense) => {
            const categoryStyle =
              CATEGORY_COLORS[expense.category] || CATEGORY_COLORS["Other"];

            return (
              <div
                key={expense.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-4 items-center hover:bg-slate-50/70 transition-colors"
              >
                {/* Title & Description */}
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {expense.title}
                    </h3>
                    {expense.description ? (
                      <p className="mt-0.5 text-xs text-slate-500 truncate">
                        {expense.description}
                      </p>
                    ) : (
                      <p className="mt-0.5 text-[11px] text-slate-400 italic">
                        No description
                      </p>
                    )}
                  </div>
                </div>

                {/* Category Badge */}
                <div className="md:col-span-3 flex items-center">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${categoryStyle.dot}`} />
                    {expense.category}
                  </span>
                </div>


                {/* Date */}
                <div className="md:col-span-2 flex items-center text-xs font-medium text-slate-500 gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400 md:hidden" />
                  {new Date(expense.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>

                {/* Amount */}
                <div className="md:col-span-2 text-left md:text-right">
                  <span className="text-sm font-extrabold text-slate-900">
                    Rs. {expense.amount.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className="md:col-span-1 flex items-center justify-end gap-3 pt-2 md:pt-0 border-t border-slate-100 md:border-t-0">
                  <EditExpenseModal expense={expense} />
                  <DeleteButton id={expense.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
