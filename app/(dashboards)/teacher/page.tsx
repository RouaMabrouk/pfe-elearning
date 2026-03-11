"use client";
import { signOut, useSession } from "next-auth/react";
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

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const FileTextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const LogOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// ── Static demo data ──────────────────────────────────────────────────────────
const stats = [
  { label: 'Published courses', value: '8', icon: <BookIcon />, accent: 'from-violet-400 to-purple-500', bg: 'from-violet-50 to-purple-50', border: 'border-violet-100' },
  { label: 'Enrolled students', value: '274', icon: <UsersIcon />, accent: 'from-rose-400 to-pink-500', bg: 'from-rose-50 to-pink-50', border: 'border-rose-100' },
  { label: 'Quizzes created', value: '42', icon: <SparkleIcon />, accent: 'from-amber-400 to-orange-500', bg: 'from-amber-50 to-orange-50', border: 'border-amber-100' },
  { label: 'PDF summaries', value: '19', icon: <FileTextIcon />, accent: 'from-teal-400 to-cyan-500', bg: 'from-teal-50 to-cyan-50', border: 'border-teal-100' },
];

const myCourses = [
  { title: 'Algorithms & Data Structures', students: 98, status: 'Published', statusColor: 'text-teal-600 bg-teal-50 border-teal-200', progress: 100 },
  { title: 'SQL Databases', students: 112, status: 'Published', statusColor: 'text-teal-600 bg-teal-50 border-teal-200', progress: 100 },
  { title: 'Introduction to Networks', students: 64, status: 'Draft', statusColor: 'text-amber-600 bg-amber-50 border-amber-200', progress: 55 },
];

const recentActivity = [
  { text: 'Rania A. completed the "Graphs" quiz', time: '5 min ago', icon: '🎯' },
  { text: 'New comment on "SQL JOINs"', time: '23 min ago', icon: '💬' },
  { text: '12 new students enrolled', time: '1h ago', icon: '🎓' },
];

export default function TeacherDashboard() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "Teacher";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-violet-100 font-sans antialiased">
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-rose-200/30 blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-violet-100/40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-violet-400 to-rose-500 text-white shadow-md shadow-violet-200">
              <SparkleIcon />
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-500 to-rose-600 bg-clip-text text-transparent">EduQuest</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-500">hello, <span className="font-semibold text-slate-700">{name}</span></span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white/80 border border-slate-200 hover:border-violet-300 hover:text-violet-500 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.97]"
            >
              <LogOutIcon />
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-violet-400 tracking-widest uppercase mb-1">Teacher Space</p>
            <h1 className="text-3xl font-extrabold text-slate-800">Welcome back, {name} 👩‍🏫</h1>
            <p className="text-slate-500 mt-1">Manage your courses and track your students&apos; progress.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-400 to-rose-500 shadow-lg shadow-violet-200/60 hover:shadow-violet-300/70 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            <PlusIcon /> New course
          </button>
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
          {/* ── My Courses ── */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 mb-2">📚 My Courses</h2>
            {myCourses.map((c) => (
              <div
                key={c.title}
                className="group flex flex-col gap-3 p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">{c.title}</h3>
                  <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${c.statusColor}`}>{c.status}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><UsersIcon />{c.students} students</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>Content completion</span>
                    <span className="font-semibold text-slate-600">{c.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-rose-500 transition-all duration-500" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="text-xs font-semibold text-violet-500 hover:text-violet-700 transition-colors">Edit →</button>
                  <span className="text-slate-200">|</span>
                  <button className="text-xs font-semibold text-rose-400 hover:text-rose-600 transition-colors">Generate AI Quiz</button>
                </div>
              </div>
            ))}
          </div>

          {/* ── Recent Activity ── */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 mb-2">🔔 Recent Activity</h2>
            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-violet-50 transition-colors">
                  <span className="text-xl">{a.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-slate-700 leading-snug">{a.text}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-rose-50 border border-violet-100 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Quick actions</h3>
              <div className="space-y-2">
                {[
                  { label: '✨ Generate AI Quiz', color: 'from-violet-400 to-purple-500' },
                  { label: '📄 Auto PDF Summary', color: 'from-rose-400 to-pink-500' },
                  { label: '📊 View Stats', color: 'from-amber-400 to-orange-500' },
                ].map((btn) => (
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