"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/app/actions/auth";

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    async function handleSubmit(formData: FormData) {
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        setPasswordError("");

        await registerUser(formData);
    }

    return (
        <form action={handleSubmit} className="mt-6 space-y-4">

            <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                    Name
                </label>

                <input
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                />
            </div>

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
                        minLength={6}
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

            <div>
                <label className="mb-1 block text-xs font-bold text-slate-700">
                    Confirm Password
                </label>

                <div className="relative">
                    <input
                        name="confirmPassword"
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        required
                        minLength={6}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 pr-10 text-xs sm:text-sm text-slate-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        aria-label={
                            showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                </div>

                {passwordError && (
                    <p className="mt-1 text-xs text-red-500 font-medium">
                        {passwordError}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 transition-all"
            >
                Sign Up
            </button>
        </form>
    );
}
