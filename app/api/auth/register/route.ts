import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import {
  createVerificationToken,
  deleteExpiredTokens,
  getVerificationTokenByEmail,
} from "@/lib/db/queries/email-verification-tokens";
import { getUserByEmail } from "@/lib/db/queries/user";
import { users } from "@/lib/db/schema";
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

    // Delete any expired tokens
    await deleteExpiredTokens(email);

    // Check for existing verification tokens
    const existingTokens = await getVerificationTokenByEmail(email);

    // If there's an active token, return message to check email
    const activeToken = existingTokens.find(
      (token: { expires: Date }) => token.expires > new Date(),
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
      const { tokenId } = await createVerificationToken(email);
      verificationTokenId = tokenId;
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
