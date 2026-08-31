"use client";

import { useState } from "react";
import { createExpense } from "@/app/actions/expense";

export default function AddExpenseModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Open button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
                + Add Expense
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Add Expense
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Record a new expense.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-xl text-gray-400 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <form action={createExpense} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Title
                                </label>

                                <input
                                    name="title"
                                    type="text"
                                    placeholder="e.g. Lunch"
                                    required
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Amount
                                </label>

                                <input
                                    name="amount"
                                    type="number"
                                    step="0.01"
                                    placeholder="e.g. 250"
                                    required
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    required
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                                >
                                    <option value="">Select category</option>
                                    <option value="Food">Food</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Bills">Bills</option>
                                    <option value="Shopping">Shopping</option>
                                    <option value="Entertainment">
                                        Entertainment
                                    </option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Optional"
                                    rows={3}
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Date */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Date
                                </label>

                                <input
                                    name="date"
                                    type="date"
                                    required
                                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                                >
                                    Add Expense
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}