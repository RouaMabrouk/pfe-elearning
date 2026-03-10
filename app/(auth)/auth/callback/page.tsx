"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";

export default function OAuthCallbackPage() {
    const router = useRouter();
    const [error, setError] = useState("");

    useEffect(() => {
        const handleOAuth = async () => {
            try {
                // Get URL hash parameters returned by Supabase
                const hash = window.location.hash.substring(1); // remove '#'
                const params = new URLSearchParams(hash);
                const accessToken = params.get("access_token");
                const type = params.get("type");
                const errorDescription = params.get("error_description");

                if (errorDescription) {
                    setError(errorDescription);
                    return;
                }

                // --- PASSWORD RECOVERY FLOW ---
                // Supabase sends type=recovery when the user clicked a reset-password link.
                // Forward the full hash to the reset-password page so it can call setSession.
                if (type === "recovery") {
                    router.replace(`/reset-password#${hash}`);
                    return;
                }

                if (!accessToken) {
                    setError("No access token returned from Supabase.");
                    return;
                }

                // Check if this is a first-time Google sign-in
                const roleFromStorage = sessionStorage.getItem("googleAuthRole");

                // Call NextAuth credentials provider to log in / create session
                const result = await signIn("credentials", {
                    accessToken,
                    role: roleFromStorage, // only used for first-time registration
                    redirect: false,
                });

                if (result?.error) {
                    setError(result.error);
                    return;
                }

                // Clear stored role to avoid conflicts in future logins
                sessionStorage.removeItem("googleAuthRole");

                // Get fresh session to read role from database
                const session = await getSession();
                const role = session?.user?.role;

                // Redirect based on role
                if (role === "Teacher") {
                    router.push("/dashboards/teacher");
                } else if (role === "Student") {
                    router.push("/dashboards/student");
                } else if (role === "Admin") {
                    router.push("/dashboards/admin");
                } else {
                    router.push("/"); // fallback
                }
            } catch (err: unknown) {
                const message = err instanceof Error ? err.message : "Something went wrong during OAuth login.";
                setError(message);
            }
        };

        handleOAuth();
    }, [router]);

    if (error) {
        return (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-pink-600 shadow-lg mb-4">
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold text-white mb-2">Authentication Error</h1>
                <p className="text-sm text-red-400 mb-4">{error}</p>
                <a href="/login" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                    Back to Login
                </a>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center gap-3 py-12 text-white/40 text-sm">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Completing sign in…
        </div>
    );
}
