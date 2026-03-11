"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase-client";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError("Invalid email or password. Please try again.");
        } else {
            const session = await getSession();
            const role = session?.user?.role;

            if (role === "Student") {
                router.push("/student");
            } else if (role === "Teacher") {
                router.push("/teacher");
            } else if (role === "Admin") {
                router.push("/admin");
            } else {
                router.push("/");
            }
        }
    };

    const handleGoogleSignIn = async () => {

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
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-violet-500 shadow-lg shadow-rose-200/60 mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome back!</h1>
                <p className="text-sm text-slate-500 mt-1">Sign in to your account to continue learning</p>
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
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">Email address</label>
                    <input
                        id="login-email"
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
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-slate-600">Password</label>
                        <Link href="/forgot-password" className="text-xs text-rose-500 hover:text-violet-500 font-medium transition-colors">
                            Forgot password?
                        </Link>
                    </div>
                    <input
                        id="login-password"
                        type="password"
                        required
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                </div>

                <button
                    id="login-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 mt-2 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-rose-400 to-violet-500 hover:from-rose-500 hover:to-violet-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-rose-200/60 hover:shadow-rose-300/70 hover:scale-[1.02] active:scale-[0.98]"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Signing in…
                        </span>
                    ) : (
                        "Sign in"
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
                    Sign in with Google
                </button>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-rose-500 hover:text-violet-500 font-semibold transition-colors">
                    Create one
                </Link>
            </p>
        </div>
    );
}

