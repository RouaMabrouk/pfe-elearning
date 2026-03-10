"use client";
import { signOut } from "next-auth/react";


export default function TeacherDashboard() {
    return (
        <button onClick={() => signOut({ callbackUrl: "/login" })}>
            Log out
        </button>
    );
}