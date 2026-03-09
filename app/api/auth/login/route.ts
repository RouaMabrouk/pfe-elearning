import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return NextResponse.json(
      { message: error?.message ?? "Invalid credentials" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: "Login successful", userId: data.user.id },
    { status: 200 }
  );
}
