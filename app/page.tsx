import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar activePage="home" />

      <section className="mx-auto my-auto max-w-4xl px-6 py-16 text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-700 leading-tight">
          Track your spending. Stay in control.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-slate-500 leading-relaxed">
          See your expenses clearly, manage spending, and make smarter decisions
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/signup"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-all"
          >
            Get Started
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}