"use client";

import { deleteExpense } from "@/app/actions/expense";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ id }: { id: number }) {
    const handleDelete = (event: React.FormEvent<HTMLFormElement>) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmed) {
            event.preventDefault();
        }
    };

    return (
        <form action={deleteExpense} onSubmit={handleDelete}>
            <input
                type="hidden"
                name="id"
                value={id}
            />

            <button
                type="submit"
                title="Delete expense"
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </form>
    );
}