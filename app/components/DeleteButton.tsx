"use client";

import { useState } from "react";
import { deleteExpense } from "@/app/actions/expense";
import { Trash2, AlertTriangle } from "lucide-react";

export default function DeleteButton({ id }: { id: number }) {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setShowConfirm(true)}
                title="Delete expense"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
            >
                <Trash2 className="h-4 w-4" />
            </button>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 px-4">
                    <div className="relative w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-xl">                      

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50">
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                        </div>

                        <div className="mt-3 pr-6">
                            <h2 className="text-base font-semibold text-slate-900">
                                Delete expense?
                            </h2>

                            <p className="mt-1.5 text-sm leading-5 text-slate-500">
                                Are you sure you want to delete this expense?                            
                            </p>
                        </div>

                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowConfirm(false)}
                                className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <form action={deleteExpense}>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={id}
                                />

                                <button
                                    type="submit"
                                    className="rounded-lg bg-red-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}