import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // utilise ton prisma déjà configuré
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // Récupérer les données envoyées depuis le frontend
    const { name, email, password, role } = await req.json();

    // Vérification basique
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur avec le mot de passe hashé
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role, // "STUDENT" / "TEACHER" / "ADMIN"
        password: hashedPassword, // stocke le hash
      },
    });

    // Créer automatiquement le wallet
    await prisma.wallet.create({
      data: {
        userId: user.id,
        coins: 0,
        diamonds: 0,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}