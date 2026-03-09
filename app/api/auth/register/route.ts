import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { name, email, password, role } = await req.json();

  if (!name || !email || !password || !role) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  // 1. Register with Supabase Auth (Supabase handles password hashing)
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // skip email confirmation for now
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  const supabaseUserId = data.user.id; // This is a UUID from Supabase auth.users

  // 2. Create your Prisma User using the same UUID from Supabase Auth
  const user = await prisma.user.create({
    data: {
      id: supabaseUserId, // link Prisma user to Supabase auth user
      name,
      email,
      role,
      password: "", // no longer needed — Supabase Auth handles this
    },
  });

  // 3. Create wallet as before
  await prisma.wallet.create({
    data: { userId: user.id, coins: 0, diamonds: 0 },
  });

  return NextResponse.json({ message: "User registered successfully", userId: user.id }, { status: 201 });
}
