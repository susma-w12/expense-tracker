import Link from "next/link";
import SignupForm from "@/app/components/SignupForm";

export default function SignupPage() {
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
                        Create Account
                    </h1>
                    <p className="mt-1 text-xs text-slate-500">
                        Create an account to start tracking your spending.
                    </p>
                </div>

                <SignupForm />

                <p className="mt-6 text-center text-xs text-slate-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-bold text-indigo-600 hover:underline"
                    >
                        Log in
                    </Link>
                </p>

            </div>
        </main>
    );
}