"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setError("");

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password");
            return;
        }

        router.push("/dashboard");
    }

    return (
        <form action={handleSubmit} className="mt-6 space-y-4">

            <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                    Email
                </label>

                <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
            </div>

            <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                    Password
                </label>

                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 pr-10 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>
            </div>

            {error && (
                <p className="text-xs text-red-500 font-medium">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
            >
                Log In
            </button>
        </form>
    );
}
