"use client";

import { deleteExpense } from "@/app/actions/expense";

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
                className="text-red-600 hover:underline"
            >
                Delete
            </button>
        </form>
    );
}