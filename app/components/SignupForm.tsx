"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [signupError, setSignupError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        
        setSignupError("");

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        setPasswordError("");
        
        const result = await registerUser(formData);

        if(result?.error){
            setSignupError(result.error);
            return;
        }

        setSuccessMessage("Account created successfully! Redirecting to login...");

        setTimeout(() => {
            router.push("/login");
        }, 2000);
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

            {signupError && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                    {signupError}
                </p>
            )}

            {successMessage && (
                <p className="text-xs font-medium text-indigo-600">{successMessage}</p>
            )}

            <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98]"
            >
                Sign Up
            </button>
        </form>
    );
}
