import { cache } from "react";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { and, eq, gt } from "drizzle-orm";
import NextAuth, { DefaultSession } from "next-auth";

import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./lib/db/queries/user";
import { emailVerificationTokens } from "./lib/db/schema";
import { generateRandomCode } from "./lib/utils";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      status: ApplicationStatus;
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
    async signIn({ account, user, credentials }): Promise<boolean | string> {
      if (!user.id) {
        return false;
      }

      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.email) {
        return false;
      }

      // Check email verification status after successful authentication
      if (!existingUser.emailVerified) {
        // Check for existing verification token
        const existingToken = await db
          .select()
          .from(emailVerificationTokens)
          .where(
            and(
              eq(emailVerificationTokens.email, existingUser.email),
              gt(emailVerificationTokens.expires, new Date()),
            ),
          )
          .limit(1);

        if (existingToken.length > 0) {
          console.log("Existing token:", existingToken[0]);

          // Token exists and is valid
          return `/email-verification?token=${existingToken[0].id}`;
        }

        // No valid token exists - create a new one
        console.log("No token found, creating new one...");

        const verificationCode = generateRandomCode(6);
        console.log("Verification code:", verificationCode);

        const newToken = await db
          .insert(emailVerificationTokens)
          .values({
            email: existingUser.email,
            code: verificationCode,
            expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
          })
          .returning({ id: emailVerificationTokens.id });

        console.log("New token:", newToken[0]);

        // TODO: Send verification email
        // await sendVerificationEmail({
        //   email: existingUser.email,
        //   name: existingUser.name,
        //   code: verificationCode,
        //   token: newToken[0].id,
        // });
        return `/email-verification?token=${newToken[0].id}`;
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

        if (token.status) {
          session.user.status = token.status as ApplicationStatus;
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
      token.role = existingUser.role as UserRole | "unassigned";
      token.status = existingUser.applicationStatus as
        | ApplicationStatus
        | "not_applied";

      return token;
    },
  },
  ...authConfig,
});

export const getCurrentUser = cache(async () => {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session.user;
});
