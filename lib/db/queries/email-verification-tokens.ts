import { and, eq, gt, lt } from "drizzle-orm";

import { generateRandomCode } from "../../utils";
import { db } from "../index";
import { emailVerificationTokens } from "../schema";

export async function createVerificationToken(email: string) {
  const verificationCode = generateRandomCode(6);

  const now = new Date();
  const [token] = await db
    .insert(emailVerificationTokens)
    .values({
      email,
      code: verificationCode,
      createdAt: now,
      expires: new Date(now.getTime() + 1000 * 60 * 15), // 15 minutes
    })
    .returning({ id: emailVerificationTokens.id });

  return { tokenId: token.id, code: verificationCode };
}

export async function getVerificationTokenByEmail(email: string) {
  const tokens = await db
    .select()
    .from(emailVerificationTokens)
    .where(
      and(
        eq(emailVerificationTokens.email, email),
        gt(emailVerificationTokens.expires, new Date()),
      ),
    );
  return tokens;
}

export async function getVerificationTokenById(id: string) {
  return await db
    .select()
    .from(emailVerificationTokens)
    .where(
      and(
        eq(emailVerificationTokens.id, id),
        gt(emailVerificationTokens.expires, new Date()),
      ),
    )
    .get();
}

export async function deleteExpiredTokens(email: string) {
  return await db
    .delete(emailVerificationTokens)
    .where(
      and(
        eq(emailVerificationTokens.email, email),
        lt(emailVerificationTokens.expires, new Date()),
      ),
    );
}

export async function deleteVerificationTokenById(id: string) {
  return await db
    .delete(emailVerificationTokens)
    .where(eq(emailVerificationTokens.id, id));
}
