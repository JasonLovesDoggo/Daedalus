import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./lib/db/queries/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, user }) {
      console.log("account", account, "user", user);

      if (!user.id) return false;

      if (account?.provider !== "credentials") return true;

      // TODO: Email verifications

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
          // session.user.role = token.role; // TODO
        }

        session.user.name = token.name;
        session.user.image = token.picture;
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
      token.picture = existingUser.image;
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
