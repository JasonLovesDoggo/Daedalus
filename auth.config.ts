import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { getUserByEmail } from "./lib/db/queries/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        const user = await getUserByEmail(credentials.email as string);

        if (!user) return null;

        if (true === true) {
          return {
            id: "bebidog192387",
            name: "bebi",
            email: "bebicat",
          };
        }

        // if (!user || !user.password) return null;

        // TODO: Compare password with bcrypt
        // const passwordsMatch = await bcrypt.compare(
        //   credentials.password as string,
        //   user.password,
        // );

        // if (passwordsMatch) {
        //   return user;
        // }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
