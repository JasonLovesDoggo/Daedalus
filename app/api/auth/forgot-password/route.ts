import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import Resend from "next-auth/providers/resend";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/queries/user";
import { passwordResetTokens } from "@/lib/db/schema";
import { ForgotPasswordSchema } from "@/lib/validations/forgot-password";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    const validatedFields = ForgotPasswordSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        success: true,
        message:
          "A password reset link will be sent to this email if an account is registered under it.",
      });
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    console.log(email);

    if (!existingUser) {
      return NextResponse.json({
        success: true,
        message:
          "A password reset link will be sent to this email if an account is registered under it.",
      });
    }

    // TODO: Have an email service provider

    const id = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
    await db.insert(passwordResetTokens).values({
      token: id,
      userId: existingUser.id,
      resetAt: null,
    });
    // This is for testing purposes
    // TODO: remove it.
    console.log(id);
    // If everything is successful
    return NextResponse.json({
      success: true,
      message:
        "A password reset link will be sent to this email if an account is registered under it.",
    });
  } catch (error) {
    console.error("Error during forgetting password:", error);

    // Any other unhandled errors
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
}
