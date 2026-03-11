"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// ── Icons (inline SVGs – no extra dep) ──────────────────────────────────────
const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const FileTextIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const BotIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" /><path d="M20 14h2" />
    <path d="M15 13v2" /><path d="M9 13v2" />
  </svg>
);

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
);

// ── Feature data ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: <BrainIcon />,
    accent: "from-rose-400 to-pink-500",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    title: "AI-Generated Quizzes",
    description:
      "Our AI engine analyses your modules and automatically generates personalised quizzes adapted to your level and learning pace.",
  },
  {
    icon: <FileTextIcon />,
    accent: "from-violet-400 to-purple-500",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
    title: "Automatic PDF Summaries",
    description:
      "Upload your PDF documents and get clear, structured intelligent summaries in seconds to make your revision faster and easier.",
  },
  {
    icon: <TrophyIcon />,
    accent: "from-amber-400 to-orange-500",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-100",
    title: "Gamification & Leaderboard",
    description:
      "Earn Coins and Diamonds with every step forward. Climb the leaderboard and stay motivated with an engaging rewards system.",
  },
  {
    icon: <BotIcon />,
    accent: "from-teal-400 to-cyan-500",
    bg: "from-teal-50 to-cyan-50",
    border: "border-teal-100",
    title: "AI Chatbot Assistant",
    description:
      "Ask your questions anytime to our built-in virtual assistant. It answers, explains, and guides your learning in real time.",
  },
];

// ── Stats data ───────────────────────────────────────────────────────────────
const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "500+", label: "Available Courses" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "24/7", label: "AI Support" },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-violet-100 font-sans antialiased overflow-x-hidden">

      {/* ── Ambient blobs ──────────────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-rose-200/30 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-violet-200/30 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-pink-200/20 blur-[100px]" />
      </div>

      {/* ── NAVBAR ─────────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-white/70 backdrop-blur-xl shadow-sm shadow-rose-100/50 border-b border-white/60"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-rose-400 to-violet-500 text-white shadow-md shadow-rose-200 group-hover:shadow-rose-300 transition-shadow">
              <SparkleIcon />
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent tracking-tight">
              EduQuest
            </span>
          </Link>

          {/* Login button */}
          <Link
            href="/login"
            className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-rose-400 to-violet-500 shadow-lg shadow-rose-200/60 hover:shadow-rose-300/70 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Log in</span>
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-28 px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-rose-100 shadow-sm shadow-rose-100/50 mb-8">
          <span className="flex h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
          <span className="text-xs font-semibold text-rose-500 tracking-widest uppercase">Powered by AI · Beta</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl mx-auto text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-slate-800 mb-6">
          The{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-violet-500 bg-clip-text text-transparent">
              intelligent
            </span>
            <svg aria-hidden className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 9C50 3 100 1 150 4s100 6 148 1" stroke="url(#uGrad)" strokeWidth="3" strokeLinecap="round" />
              <defs>
                <linearGradient id="uGrad" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fb7185" /><stop offset="1" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
          </span>{" "}
          learning of tomorrow
        </h1>

        {/* Subheading */}
        <p className="max-w-xl mx-auto text-lg sm:text-xl text-slate-500 leading-relaxed mb-10">
          A gamified e-learning platform that combines generative AI, adaptive quizzes, and automatic summaries to supercharge your learning journey.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-gradient-to-r from-rose-400 to-violet-500 shadow-xl shadow-rose-200/70 hover:shadow-rose-300/80 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <SparkleIcon />
            Start the adventure
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-1">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>
          <a
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-600 bg-white/70 backdrop-blur-sm border border-slate-200 hover:bg-white hover:border-rose-200 hover:text-rose-500 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm"
          >
            Explore features
          </a>
        </div>

        {/* Hero visual – floating card mockup */}
        <div className="mt-20 max-w-2xl mx-auto">
          <div className="relative rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-2xl shadow-slate-200/60 p-6 sm:p-8 overflow-hidden">
            {/* Gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-400 via-pink-400 to-violet-500 rounded-t-3xl" />

            {/* Mock content */}
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-200">AI</div>
              <div className="flex-1 bg-violet-50 rounded-2xl rounded-tl-sm p-4 text-left">
                <p className="text-sm text-slate-600 leading-relaxed">Hello! I&apos;ve analysed your <strong>Algorithms &amp; Data Structures</strong> module. Would you like to start an adaptive quiz or get a summary?</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "AI Quiz", color: "bg-rose-50 border-rose-100 text-rose-600" },
                { label: "PDF Summary", color: "bg-violet-50 border-violet-100 text-violet-600" },
                { label: "My Score", color: "bg-amber-50 border-amber-100 text-amber-600" },
              ].map((b) => (
                <div key={b.label} className={`rounded-xl border px-3 py-2.5 text-xs font-semibold text-center cursor-pointer hover:scale-105 transition-transform ${b.color}`}>
                  {b.label}
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Module progress</span><span className="font-semibold text-slate-600">68%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-rose-400 to-violet-500" style={{ animation: "none" }} />
              </div>
            </div>

            {/* Reward badges */}
            <div className="mt-5 flex items-center gap-2">
              <span className="text-xs text-slate-400">Rewards:</span>
              {[
                { emoji: "🪙", val: "1,240 Coins" },
                { emoji: "💎", val: "36 Diamonds" },
              ].map((r) => (
                <span key={r.val} className="inline-flex items-center gap-1 text-xs font-semibold bg-white/80 border border-slate-100 rounded-full px-3 py-1 shadow-sm">
                  {r.emoji} {r.val}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <p className="text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-violet-500 bg-clip-text text-transparent mb-1">{s.value}</p>
              <p className="text-sm text-slate-500 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-rose-400 tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 leading-tight">
              Everything you need<br className="hidden sm:block" /> to learn better
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
              A suite of AI tools designed to transform every study session into a unique and highly effective experience.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group relative flex flex-col gap-4 p-6 rounded-3xl bg-gradient-to-br ${f.bg} border ${f.border} backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
              >
                {/* Icon */}
                <div className={`self-start flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${f.accent} text-white shadow-lg`}>
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{f.description}</p>
                <div className={`self-start text-xs font-semibold bg-gradient-to-r ${f.accent} bg-clip-text text-transparent flex items-center gap-1 group-hover:gap-2 transition-all`}>
                  Learn more
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
                    <path fillRule="evenodd" d="M2 8a.5.5 0 0 1 .5-.5h9.793L9.146 4.354a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L12.293 8.5H2.5A.5.5 0 0 1 2 8z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Decorative circle */}
                <div className={`absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${f.accent} opacity-10 group-hover:opacity-20 transition-opacity`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-400 via-pink-400 to-violet-500 p-10 sm:p-16 text-center shadow-2xl shadow-rose-200/60">
            {/* Blob overlays */}
            <div aria-hidden className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div aria-hidden className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative">
              <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">Join us today</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Ready to revolutionise the way you learn?
              </h2>
              <p className="text-white/80 text-base max-w-md mx-auto mb-8">
                Create your free account and start exploring thousands of courses enhanced by artificial intelligence.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base bg-white text-violet-600 hover:bg-violet-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-violet-700/20"
              >
                <SparkleIcon />
                Create a free account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer className="py-10 px-6 border-t border-slate-100/80">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-rose-400 to-violet-500 text-white">
              <SparkleIcon />
            </span>
            <span className="font-bold text-slate-700">LearnAI</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-400 text-center">
            © {new Date().getFullYear()} LearnAI. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-5 text-sm">
            {["Privacy", "Terms", "Contact"].map((l) => (
              <a key={l} href="#" className="text-slate-400 hover:text-rose-500 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
