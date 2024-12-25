import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { and, eq, lt } from "drizzle-orm";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/queries/user";
import { emailVerificationTokens, users } from "@/lib/db/schema";
import { generateRandomCode } from "@/lib/utils";
import { registerSchema } from "@/lib/validations/register";

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({
        success: false,
        message: validation.error.errors[0].message,
      });
    }

    const { email, name, password } = validation.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    // Check for existing verification tokens
    const existingTokens = await db
      .select()
      .from(emailVerificationTokens)
      .where(eq(emailVerificationTokens.email, email));

    // Delete any expired tokens
    await db
      .delete(emailVerificationTokens)
      .where(
        and(
          eq(emailVerificationTokens.email, email),
          lt(emailVerificationTokens.expires, new Date()),
        ),
      );

    // If there's an active token, return message to check email
    const activeToken = existingTokens.find(
      (token) => token.expires > new Date(),
    );
    if (activeToken) {
      return NextResponse.json({
        success: false,
        message:
          "A verification email has already been sent. Please check your inbox.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateRandomCode(6);
    console.log("Verification code:", verificationCode);

    let verificationTokenId = "";

    await db.transaction(async (tx) => {
      // Create user
      await tx.insert(users).values({
        name,
        email,
        password: hashedPassword,
      });

      // Create new verification token
      const result = await tx
        .insert(emailVerificationTokens)
        .values({
          email,
          code: verificationCode,
          expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
        })
        .returning({ id: emailVerificationTokens.id });

      verificationTokenId = result[0].id;
    });

    return NextResponse.json({
      success: true,
      message:
        "Account created successfully! Redirecting to email verification...",
      data: {
        verificationToken: verificationTokenId,
      },
    });
  } catch (error) {
    console.error("Error during registration:", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
