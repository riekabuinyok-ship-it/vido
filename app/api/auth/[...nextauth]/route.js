import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";
const useSecureCookies = NEXTAUTH_URL.startsWith("https://");

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        try {
          const user = await prisma.user.findUnique({ where: { email } });

          if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
              throw new Error("Invalid password");
            }
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          }
        } catch (error) {
          // DB unavailable (offline/dev) - fall through to env fallback below.
        }

        // Fallback so the admin can sign in even when the database is down,
        // using the credentials configured in .env.local.
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return {
            id: "fallback-admin",
            email,
            name: "Admin",
            role: process.env.ADMIN_ROLE || "admin",
          };
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    csrfToken: {
      name: useSecureCookies
        ? "__Host-next-auth.csrf-token"
        : "next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecureCookies,
        encode: (value) => value,
      },
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
