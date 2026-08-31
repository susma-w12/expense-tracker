import Link from "next/link";
import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
            <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">

                <div className="mb-6 text-center sm:text-left">
                    <Link href="/" className="inline-flex items-center gap-2 font-bold text-lg text-slate-900 mb-4">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                            E
                        </div>
                        <span>Expense<span className="text-indigo-600">Tracker</span></span>
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Welcome Back
                    </h1>
                    <p className="mt-1 text-xs text-slate-500">
                        Log in to manage your expenses and view reports.
                    </p>
                </div>

                <LoginForm />

                <p className="mt-6 text-center text-xs text-slate-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-bold text-indigo-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>

            </div>
        </main>
    );
}