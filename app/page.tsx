import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold">
            Expense Tracker
          </Link>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>

            <Link href="/login" className="hover:text-blue-600">
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="mb-4 text-sm font-medium text-blue-600">
          SIMPLE. SMART. ORGANIZED.
        </p>

        <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight">
          Take control of your everyday expenses
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-500">
          Track your spending, understand where your money goes,
          and make better financial decisions with a simple expense
          management system.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-lg bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded-lg border px-6 py-3 font-medium hover:bg-gray-50"
          >
            Login
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">
              Everything you need to manage expenses
            </h2>

            <p className="mt-3 text-gray-500">
              Keep your daily spending organized in one place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-xl border bg-white p-6">
              <h3 className="text-lg font-semibold">
                Track Expenses
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Record your daily expenses with details such as
                amount, category, date, and description.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="text-lg font-semibold">
                Understand Spending
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                See your spending patterns and understand where
                most of your money is going.
              </p>
            </div>

            <div className="rounded-xl border bg-white p-6">
              <h3 className="text-lg font-semibold">
                Stay Organized
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Manage, update, and review your expenses from
                one organized dashboard.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold">
            How it works
          </h2>

          <p className="mt-3 text-gray-500">
            Start managing your expenses in three simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              1
            </div>

            <h3 className="mt-4 font-semibold">
              Create an account
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Sign up and create your personal expense account.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              2
            </div>

            <h3 className="mt-4 font-semibold">
              Add your expenses
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Record your daily spending and organize it by category.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              3
            </div>

            <h3 className="mt-4 font-semibold">
              Understand your spending
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Use your dashboard to review and understand your expenses.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 px-6 py-20 text-center text-white">
        <h2 className="text-3xl font-bold">
          Ready to take control of your expenses?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-gray-300">
          Create your account and start tracking your spending today.
        </p>

        <Link
          href="/signup"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-medium text-black hover:bg-gray-100"
        >
          Create Account
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-500 md:flex-row">
          <p>
            © 2026 Expense Tracker. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/" className="hover:text-black">
              Home
            </Link>

            <Link href="/login" className="hover:text-black">
              Login
            </Link>

            <Link href="/signup" className="hover:text-black">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>

    </main>
  );
}