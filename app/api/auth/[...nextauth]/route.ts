import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "CustomAuth",
      credentials: {
        email: { label: "Email", type: "email", required: false },
        password: { label: "Password", type: "password", required: false },
        accessToken: { label: "Access Token", type: "text", required: false },
        role: { label: "Role", type: "text", required: false },
      },

      async authorize(credentials) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        if (credentials?.accessToken) {
          // 🔹 Handle Supabase OAuth sign-in (Google)
          const { data: { user: sbUser }, error } = await supabase.auth.getUser(credentials.accessToken);

          if (error || !sbUser) return null;

          // Check if user exists in Prisma
          let user = await prisma.user.findUnique({
            where: { id: sbUser.id },
          });

          if (!user) {
            // New Google signup needs a role, if no role provided we can't create them properly
            const userRole = credentials.role || "Student"; // fallback just in case

            user = await prisma.user.create({
              data: {
                id: sbUser.id,
                name: sbUser.user_metadata?.full_name || sbUser.email?.split("@")[0] || "User",
                email: sbUser.email!,
                role: userRole as any,
                password: "", // Handled by Supabase
              },
            });

            // Create initial wallet
            await prisma.wallet.create({
              data: { userId: user.id, coins: 0, diamonds: 0 },
            });
          }

          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        } else if (credentials?.email && credentials?.password) {
          // 🔹 Handle Email/Password sign-in
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error || !data.user) return null;

          // Fetch role from Prisma database
          const user = await prisma.user.findUnique({
            where: { id: data.user.id },
          });

          if (!user) return null;

          return {
            id: user.id,
            email: user.email,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };