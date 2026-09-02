import Link from "next/link";

type NavbarProps = {
  activePage?: "home" | "login" | "signup";
};

export default function Navbar({ activePage }: NavbarProps) {
  return (
    <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-slate-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-sm">
            E
          </div>
          <span>
            Expense<span className="text-indigo-600">Tracker</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
              activePage === "login"
                ? "bg-slate-100 text-indigo-600 border border-indigo-200"
                : "border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold shadow-sm transition-all ${
              activePage === "signup"
                ? "bg-indigo-700 text-white ring-2 ring-indigo-300"
                : "bg-indigo-600 text-white hover:bg-indigo-500"
            }`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
