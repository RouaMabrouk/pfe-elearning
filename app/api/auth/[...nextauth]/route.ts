import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Let Supabase Auth verify the credentials
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials!.email,
          password: credentials!.password,
        });

        if (error || !data.user) return null;

        // Return Supabase user info to NextAuth session
        return {
          id: data.user.id,
          email: data.user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
