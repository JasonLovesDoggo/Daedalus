import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession } from "next-auth";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./lib/db/queries/user";
import { UserRole } from "./types/user";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  cookies: {
    sessionToken: {
      name: "authjs.session-token",
    },
  },
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, user }) {
      if (!user.id) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        if (token.role) {
          session.user.role = token.role as UserRole;
        }

        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      // token.role = existingUser.role; // TODO

      return token;
    },
  },
  ...authConfig,
});

export const currentUser = async () => {
  const session = await auth();
  if (session?.user) return session.user;

  return null;
};
