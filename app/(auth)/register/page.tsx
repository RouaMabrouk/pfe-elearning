"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase-client";

type Role = "Student" | "Teacher";

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState<{ name: string; email: string; password: string; role: Role | "" }>({
        name: "",
        email: "",
        password: "",
        role: "", // Removed default role "Student"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.role) {
            setError("Please select if you are a Student or a Teacher");
            return;
        }

        setError("");
        setLoading(true);

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            setError(data.message || "Something went wrong. Please try again.");
        } else {
            router.push("/login");
        }
    };

    const handleGoogleSignIn = async () => {
        if (!form.role) {
            setError("Please select if you are a Student or a Teacher before signing in with Google");
            return;
        }

        // Save the selected role so we can use it in the OAuth callback
        sessionStorage.setItem("googleAuthRole", form.role);

        const { error } = await supabaseClient.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/callback`,
            },
        });

        if (error) {
            setError(error.message);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-rose-100/40">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-violet-500 shadow-lg shadow-pink-200/60 mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create an account</h1>
                <p className="text-sm text-slate-500 mt-1">Join the platform and start learning</p>
            </div>

            {/* Error */}
            {error && (
                <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm">
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5h2v4H9zm0 2h2v4H9v-4z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Full name</label>
                    <input
                        id="register-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Email address</label>
                    <input
                        id="register-email"
                        type="email"
                        required
                        pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                        title="Please enter a valid email address with a domain (e.g., user@example.com)"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
                    <input
                        id="register-password"
                        type="password"
                        required
                        minLength={6}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="Min. 6 characters"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                </div>

                {/* Role selector */}
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">I am a…</label>
                    <div className="grid grid-cols-2 gap-3">
                        {(["Student", "Teacher"] as Role[]).map((r) => (
                            <button
                                key={r}
                                type="button"
                                onClick={() => setForm({ ...form, role: r })}
                                className={`py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${form.role === r
                                        ? "bg-gradient-to-r from-rose-50 to-violet-50 border-rose-300 text-rose-600 shadow-sm shadow-rose-100"
                                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                            >
                                {r === "Student" ? "🎓 Student" : "📚 Teacher"}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    id="register-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 mt-2 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-pink-400 to-violet-500 hover:from-pink-500 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-pink-200/60 hover:shadow-pink-300/70 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Creating account…
                        </span>
                    ) : (
                        "Create account"
                    )}
                </button>
            </form>

            <div className="mt-6">
                <div className="flex items-center">
                    <div className="flex-1 border-t border-slate-100"></div>
                    <span className="px-3 text-sm text-slate-400">Or continue with</span>
                    <div className="flex-1 border-t border-slate-100"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="mt-4 w-full py-3 px-4 rounded-xl font-semibold text-sm text-slate-700 bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50/50 transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Sign up with Google
                </button>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="text-rose-500 hover:text-violet-500 font-semibold transition-colors">
                    Sign in
                </Link>
            </p>
        </div>
    );
}

