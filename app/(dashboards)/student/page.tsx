'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

// ── Inline icons ──────────────────────────────────────────────────────────────
const SparkleIcon = () => (
   <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M22 10L12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c3 2 9 2 12 0v-5" />
  </svg>
)

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
  </svg>
)

const LogOutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

// ── Static demo data ──────────────────────────────────────────────────────────
const stats = [
  { label: 'Courses enrolled', value: '12', icon: <BookIcon />, accent: 'from-rose-400 to-pink-500', bg: 'from-rose-50 to-pink-50', border: 'border-rose-100' },
  { label: 'Quizzes completed', value: '48', icon: <SparkleIcon />, accent: 'from-violet-400 to-purple-500', bg: 'from-violet-50 to-purple-50', border: 'border-violet-100' },
  { label: 'Coins earned', value: '1,240 🪙', icon: <TrophyIcon />, accent: 'from-amber-400 to-orange-500', bg: 'from-amber-50 to-orange-50', border: 'border-amber-100' },
  { label: 'Diamonds', value: '36 💎', icon: <BotIcon />, accent: 'from-teal-400 to-cyan-500', bg: 'from-teal-50 to-cyan-50', border: 'border-teal-100' },
]

const courses = [
  { title: 'Algorithms & Data Structures', progress: 68, color: 'from-rose-400 to-pink-500', chapter: 'Ch. 7 – Graphs', badge: '🔥 In progress' },
  { title: 'SQL Databases', progress: 40, color: 'from-violet-400 to-purple-500', chapter: 'Ch. 4 – Joins', badge: '📖 New' },
  { title: 'Full Stack Web Development', progress: 85, color: 'from-teal-400 to-cyan-500', chapter: 'Ch. 9 – Next.js', badge: '✅ Almost done' },
]

const leaderboard = [
  { rank: 1, name: 'Yasmine B.', coins: 3200, avatar: 'Y' },
  { rank: 2, name: 'Anis M.', coins: 2850, avatar: 'A' },
  { rank: 3, name: 'You', coins: 1240, avatar: 'V', isMe: true },
]

export default function StudentDashboard() {
  const { data: session } = useSession()
  const name = session?.user?.name ?? 'Student'

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-violet-100 font-sans antialiased">
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-200/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-violet-200/30 blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/60 shadow-sm shadow-rose-100/40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-violet-500 text-white shadow-md shadow-rose-200">
              <SparkleIcon />
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">EduQuest</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-500">Hello, <span className="font-semibold text-slate-700">{name}</span></span>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 bg-white/80 border border-slate-200 hover:border-rose-300 hover:text-rose-500 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.97]"
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
        <div className="mb-8">
          <p className="text-sm font-semibold text-rose-400 tracking-widest uppercase mb-1">Student Dashboard</p>
          <h1 className="text-3xl font-extrabold text-slate-800">Welcome back, {name} 👋</h1>
          <p className="text-slate-500 mt-1">Pick up right where you left off.</p>
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
          {/* ── Courses in progress ── */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-800 mb-2">📚 My Courses in Progress</h2>
            {courses.map((c) => (
              <div
                key={c.title}
                className="group flex flex-col gap-3 p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight">{c.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{c.chapter}</p>
                  </div>
                  <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-slate-100 text-slate-600 shadow-sm">{c.badge}</span>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span>Progress</span>
                    <span className="font-semibold text-slate-600">{c.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${c.color} transition-all duration-500`}
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
                <div className={`self-start text-xs font-semibold bg-gradient-to-r ${c.color} bg-clip-text text-transparent flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  Continue course →
                </div>
              </div>
            ))}
          </div>

          {/* ── Sidebar: AI + Leaderboard ── */}
          <div className="space-y-4">
            {/* AI assistant teaser */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 text-white shadow-md">
                  <BotIcon />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Assistant IA</p>
                  <p className="text-xs text-slate-500">Always available</p>
                </div>
              </div>
              <div className="bg-white/80 rounded-xl p-3 text-xs text-slate-600 leading-relaxed border border-violet-50 mb-3">
                Hi! Need help with <strong>graphs</strong> or an adaptive quiz?
              </div>
              <button className="w-full py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-400 to-purple-500 hover:from-violet-500 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                Ask a question
              </button>
            </div>

            {/* Leaderboard */}
            <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm">
              <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrophyIcon /> Leaderboard
              </h2>
              <div className="space-y-3">
                {leaderboard.map((p) => (
                  <div
                    key={p.rank}
                    className={`flex items-center gap-3 p-2.5 rounded-xl transition-colors ${p.isMe ? 'bg-rose-50 border border-rose-100' : 'hover:bg-slate-50'}`}
                  >
                    <span className="text-sm font-bold text-slate-400 w-4">#{p.rank}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${p.isMe ? 'from-rose-400 to-violet-500' : 'from-slate-300 to-slate-400'} shadow-sm`}>
                      {p.avatar}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${p.isMe ? 'text-rose-600' : 'text-slate-700'}`}>{p.name}</p>
                    </div>
                    <span className="text-xs font-bold text-amber-600">🪙 {p.coins.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}