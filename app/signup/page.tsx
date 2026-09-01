import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SignupForm from "@/app/components/SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar activePage="signup" />

      {/* Main Split Section */}
      <div className="mx-auto my-auto w-full max-w-6xl px-6 py-12 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          {/* Left Column: Landing Page Hero */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
              Expense Tracker
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
              Track your spending. Stay in control.
            </h1>
            <p className="mt-4 max-w-lg text-sm sm:text-base text-slate-500 leading-relaxed mx-auto lg:mx-0">
              See your expenses clearly, manage spending, and make smarter financial decisions with real-time analytics.
            </p>
          </div>

          {/* Right Column: Signup Form */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto lg:mx-0">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
              <div className="mb-6 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-slate-900">
                  Create Account
                </h2>
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
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}