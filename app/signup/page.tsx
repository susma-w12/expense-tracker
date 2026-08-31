import Link from "next/link";
import SignupForm from "@/app/components/SignupForm";

export default function SignupPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm">

                <h1 className="text-2xl font-bold">
                    Create Account
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Create an account to start tracking your expenses.
                </p>

                <SignupForm />

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-black hover:underline"
                    >
                        Log in
                    </Link>
                </p>

            </div>
        </main>
    );
}