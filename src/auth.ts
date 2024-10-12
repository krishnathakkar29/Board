import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) {
          throw new Error("Provide both email and password");
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Invalid Email");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("Incorrect Password");
        }

        // return {
        //   id: user.id,
        //   name: user.name,
        //   email: user.email,
        //   orgId: user.orgId, // Optional field
        // };
        console.log("user in auth", user);

        return user;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.organisationId = user.organisationId!;
        console.log("User in JWT callback:", user);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id!;
      session.user.email = token.email!;
      session.user.organisationId = token.organisationId;

      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
