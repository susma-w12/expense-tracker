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

            {/* Name */}
            <div>
                <label className="mb-1 block text-sm font-medium">
                    Name
                </label>

                <input
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Email */}
            <div>
                <label className="mb-1 block text-sm font-medium">
                    Email
                </label>

                <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
                />
            </div>

            {/* Password */}
            <div>
                <label className="mb-1 block text-sm font-medium">
                    Password
                </label>

                <div className="relative">
                    <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        minLength={6}
                        className="w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                        aria-label={
                            showPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showPassword ? (
                            <EyeOff size={19} />
                        ) : (
                            <Eye size={19} />
                        )}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <label className="mb-1 block text-sm font-medium">
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
                        className="w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-black"
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                        aria-label={
                            showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {showConfirmPassword ? (
                            <EyeOff size={19} />
                        ) : (
                            <Eye size={19} />
                        )}
                    </button>
                </div>

                {passwordError && (
                    <p className="mt-1 text-sm text-red-500">
                        {passwordError}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-800"
            >
                Sign Up
            </button>
        </form>
    );
}