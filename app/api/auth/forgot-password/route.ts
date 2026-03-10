import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXTAUTH_URL}/auth/callback?type=recovery`,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  // Always return success to avoid email enumeration
  return NextResponse.json(
    { message: "If this email exists, a reset link has been sent." },
    { status: 200 }
  );
}
