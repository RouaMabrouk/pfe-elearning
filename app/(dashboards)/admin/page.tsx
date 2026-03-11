"use client";

import Link from "next/link";

// ── Inline icons ──────────────────────────────────────────────────────────────
const SparkleIcon = () => (
   <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5">
    <path d="M22 10L12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c3 2 9 2 12 0v-5" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const ActivityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

// ── Static demo data ──────────────────────────────────────────────────────────
const stats = [
  { label: 'Total users', value: '10,482', icon: <UsersIcon />, accent: 'from-rose-400 to-pink-500', bg: 'from-rose-50 to-pink-50', border: 'border-rose-100' },
  { label: 'Available courses', value: '527', icon: <BookIcon />, accent: 'from-violet-400 to-purple-500', bg: 'from-violet-50 to-purple-50', border: 'border-violet-100' },
  { label: 'Active teachers', value: '68', icon: <ShieldIcon />, accent: 'from-teal-400 to-cyan-500', bg: 'from-teal-50 to-cyan-50', border: 'border-teal-100' },
  { label: 'AI-generated quizzes', value: '3,241', icon: <SparkleIcon />, accent: 'from-amber-400 to-orange-500', bg: 'from-amber-50 to-orange-50', border: 'border-amber-100' },
];

const recentUsers = [
  { name: 'Amira B.', role: 'Student', joined: '2h ago', avatar: 'A', active: true },
  { name: 'Karim T.', role: 'Teacher', joined: '5h ago', avatar: 'K', active: true },
  { name: 'Nour S.', role: 'Student', joined: '1 day ago', avatar: 'N', active: false },
  { name: 'Sami L.', role: 'Teacher', joined: '2 days ago', avatar: 'S', active: false },
];

const systemActivity = [
  { label: 'Overall satisfaction rate', value: 98, color: 'from-teal-400 to-cyan-500' },
  { label: 'Course completion rate', value: 74, color: 'from-violet-400 to-purple-500' },
  { label: 'Quizzes passed (first attempt)', value: 61, color: 'from-rose-400 to-pink-500' },
];

const quickActions = [
  { label: '➕ Add a user', color: 'from-rose-400 to-pink-500' },
  { label: '📚 Approve a course', color: 'from-violet-400 to-purple-500' },
  { label: '📊 Export stats', color: 'from-amber-400 to-orange-500' },
  { label: '⚙️ System settings', color: 'from-teal-400 to-cyan-500' },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-violet-100 font-sans antialiased">
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-200/20 blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-[400px] h-[400px] rounded-full bg-violet-200/20 blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-slate-100/60">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-violet-500 text-white shadow-md shadow-rose-200">
              <SparkleIcon />
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">EduQuest</span>
            <span className="text-xs font-semibold text-white bg-gradient-to-r from-rose-400 to-violet-500 px-2 py-0.5 rounded-full shadow-sm">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-100">
              <ShieldIcon />
              <span className="text-xs font-semibold text-rose-600">Administrator</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-rose-400 tracking-widest uppercase mb-1">Administration Console</p>
          <h1 className="text-3xl font-extrabold text-slate-800">Platform Overview 🛡️</h1>
          <p className="text-slate-500 mt-1">Manage users, courses, and monitor real-time metrics.</p>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => (
            <div
              key={s.label}
              className={`group relative flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br ${s.bg} border ${s.border} backdrop-blur-sm shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              <div className={`self-start flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${s.accent} text-white shadow-md`}>
                {s.icon}
              </div>
              <div>
                <p className="text-2xl font-extrabold text-slate-800">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
              </div>
              <div className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-br ${s.accent} opacity-10 group-hover:opacity-20 transition-opacity`} />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Recent Users ── */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-800 mb-4">👥 Recent Users</h2>
            <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm overflow-hidden">
              <div className="grid grid-cols-4 text-xs font-semibold text-slate-400 uppercase tracking-wide px-5 py-3 border-b border-slate-50 bg-slate-50/50">
                <span>Name</span><span>Role</span><span>Joined</span><span>Status</span>
              </div>
              {recentUsers.map((u) => (
                <div key={u.name} className="grid grid-cols-4 items-center px-5 py-3.5 border-b border-slate-50 last:border-0 hover:bg-rose-50/30 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-violet-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {u.avatar}
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{u.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{u.role}</span>
                  <span className="text-xs text-slate-400">{u.joined}</span>
                  <span className={`inline-flex w-fit text-xs font-semibold px-2.5 py-1 rounded-full ${u.active ? 'bg-teal-50 text-teal-600 border border-teal-200' : 'bg-slate-50 text-slate-400 border border-slate-200'}`}>
                    {u.active ? '● Active' : '○ Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">
            {/* Platform vitals */}
            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2"><ActivityIcon />Key Metrics</h3>
              <div className="space-y-4">
                {systemActivity.map((m) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>{m.label}</span>
                      <span className="font-semibold text-slate-700">{m.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${m.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-violet-50 border border-rose-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Quick actions</h3>
              <div className="space-y-2">
                {quickActions.map((btn) => (
                  <button
                    key={btn.label}
                    className={`w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${btn.color} hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 shadow-md`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
