"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// We need a browser-side Supabase client (anon key is fine here)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);
    const [ready, setReady] = useState(false); // true once Supabase session is established from the hash

    // Supabase puts the recovery token in the URL hash.
    // We need to call setSession so Supabase knows who is resetting.
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const type = params.get("type");

        if (type === "recovery" && accessToken && refreshToken) {
            supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken }).then(
                ({ error }) => {
                    if (error) {
                        setError("Invalid or expired reset link. Please request a new one.");
                    } else {
                        setReady(true);
                    }
                }
            );
        } else {
            setError("Invalid reset link. Please request a new one.");
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            setDone(true);
            // Give user 2 seconds to read the success message, then redirect to login
            setTimeout(() => router.push("/login"), 2500);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl shadow-violet-100/40">
            {/* Header */}
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-600 shadow-lg shadow-violet-200/60 mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Reset your password</h1>
                <p className="text-sm text-slate-500 mt-1">
                    {done ? "Password updated successfully!" : "Choose a strong new password for your account."}
                </p>
            </div>

            {/* Success state */}
            {done ? (
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-3 px-4 py-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Password updated! Redirecting you to login…</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* Error */}
                    {error && (
                        <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-500 text-sm">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5h2v4H9zm0 2h2v4H9v-4z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Show form only when the session is established */}
                    {ready ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                                    New password
                                </label>
                                <input
                                    id="reset-password"
                                    type="password"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1.5">
                                    Confirm new password
                                </label>
                                <input
                                    id="reset-confirm"
                                    type="password"
                                    required
                                    minLength={6}
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="Repeat your password"
                                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-300 text-sm focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all"
                                />
                            </div>

                            <button
                                id="reset-submit"
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 mt-2 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-400 to-purple-600 hover:from-violet-500 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-violet-200/60 hover:shadow-violet-300/70 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Updating…
                                    </span>
                                ) : (
                                    "Set new password"
                                )}
                            </button>
                        </form>
                    ) : !error ? (
                        /* Verifying the link */
                        <div className="flex items-center justify-center gap-3 py-6 text-slate-400 text-sm">
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Verifying your reset link…
                        </div>
                    ) : null}
                </>
            )}

            {/* Footer */}
            <p className="mt-6 text-center text-sm text-slate-500">
                Remembered your password?{" "}
                <Link href="/login" className="text-rose-500 hover:text-violet-500 font-semibold transition-colors">
                    Sign in
                </Link>
            </p>
        </div>
    );
}

