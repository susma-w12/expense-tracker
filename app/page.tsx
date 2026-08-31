import Link from "next/link";
import { auth } from "@/auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Top Navbar */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm">
              E
            </div>
            <span>Expense<span className="text-indigo-600">Tracker</span></span>
          </Link>

          <div className="flex items-center gap-3">
            {session ? (
              <Link
                href="/dashboard"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  Log In
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="mx-auto my-auto max-w-4xl px-6 py-16 text-center">
        

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-700 leading-tight">
          Track your spending. Stay in control.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
          See your expenses clearly, manage spending, and make smarter decisions
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          {session ? (
            <Link
              href="/dashboard"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
            >
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/signup"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
              >
                Get Started
              </Link>
              
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3 px-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
          
        </div>
      </footer>
    </main>
  );
}