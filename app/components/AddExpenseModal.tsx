"use client";

import { useState } from "react";
import { createExpense } from "@/app/actions/expense";
import { Plus, X } from "lucide-react";

export default function AddExpenseModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-500"
            >
                <Plus className="h-4 w-4" /> Add Expense
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs px-4">
                    <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl border border-slate-100">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Add Expense
                                </h2>
                                <p className="mt-0.5 text-xs text-slate-500">
                                    Record a new spending transaction.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form action={createExpense} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="mb-1 block text-xs font-bold text-slate-700">
                                    Title
                                </label>
                                <input
                                    name="title"
                                    type="text"
                                    placeholder="e.g. Grocery Shopping"
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold text-slate-700">
                                    Amount (Rs.)
                                </label>
                                <input
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 250.00"
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold text-slate-700">
                                    Category
                                </label>
                                <select
                                    name="category"
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all bg-white"
                                >
                                    <option value="">Select category</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold text-slate-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Optional"
                                    rows={3}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-xs font-bold text-slate-700">
                                    Date
                                </label>
                                <input
                                    name="date"
                                    type="date"
                                    defaultValue={new Date().toISOString().split("T")[0]}
                                    required
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all bg-white"
                                />
                            </div>

                            <div className="flex justify-end gap-2.5 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 transition-all"
                                >
                                    Save Expense
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
