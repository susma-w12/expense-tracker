"use client";

import { useState } from "react";
import { updateExpense } from "@/app/actions/expense";

type Expense = {
    id: number;
    title: string;
    amount: number;
    category: string;
    description: string | null;
    date: Date;
};

export default function EditExpenseModal({
    expense,
}: {
    expense: Expense;
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-sm font-medium text-blue-600 hover:underline"
            >
                Edit
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Edit Expense
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Update your expense details.
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
                        <form action={updateExpense} className="space-y-4">

                            <input
                                type="hidden"
                                name="id"
                                value={expense.id}
                            />

                            {/* Title */}
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Title
                                </label>

                                <input
                                    name="title"
                                    type="text"
                                    defaultValue={expense.title}
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
                                    defaultValue={expense.amount}
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
                                    defaultValue={expense.category}
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
                                    defaultValue={expense.description ?? ""}
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
                                    defaultValue={expense.date
                                        .toISOString()
                                        .split("T")[0]}
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
                                    Update Expense
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}