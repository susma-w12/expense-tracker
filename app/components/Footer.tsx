

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-4">
      <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-3 px-6 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Expense Tracker. All rights reserved.</p>
        
      </div>
    </footer>
  );
}
