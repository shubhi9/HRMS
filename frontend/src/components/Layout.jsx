import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/",           label: "Dashboard",  icon: "⬡" },
  { to: "/employees",  label: "Employees",  icon: "👥" },
  { to: "/attendance", label: "Attendance", icon: "📋" },
];

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 bg-slate-900/80 border-r border-slate-700/40 backdrop-blur-xl
                        flex flex-col fixed h-full z-40">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-slate-700/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center
                            shadow-lg shadow-indigo-500/40">
              <span className="text-white text-sm font-bold font-display">H</span>
            </div>
            <div>
              <p className="font-bold font-display text-white text-sm leading-tight">HRMS Lite</p>
              <p className="text-slate-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                 ${isActive
                   ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                   : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                 }`
              }
            >
              <span className="text-base w-5 text-center">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-700/40">
          <p className="text-xs text-slate-600">v1.0.0 · Single Admin</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-60 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-700/30
                           px-8 py-4 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500
                            flex items-center justify-center text-white text-xs font-bold shadow-md">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-200 font-display leading-tight">Admin</p>
              <p className="text-xs text-slate-500">Super User</p>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-8 animate-fade-up">
          {children}
        </div>
      </main>
    </div>
  );
}
