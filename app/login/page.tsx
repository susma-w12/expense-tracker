import Link from "next/link";
import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="w-full max-w-md rounded-2xl border p-8 shadow-sm">

                <h1 className="text-2xl font-bold">
                    Welcome Back
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Log in to manage your expenses.
                </p>

                <LoginForm />

                <p className="mt-6 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="font-medium text-black hover:underline"
                    >
                        Sign up
                    </Link>
                </p>

            </div>
        </main>
    );
}