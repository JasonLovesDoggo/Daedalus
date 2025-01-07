import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/queries/user";
import { passwordResetTokens } from "@/lib/db/schema";
import { sendResetPasswordEmail } from "@/lib/emails/ses";
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
          "A password reset link will be sent to the email if an account is registered under it.",
      });
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json({
        success: true,
        message:
          "A password reset link will be sent to the email if an account is registered under it.",
      });
    }

    // Generate a UUID for the reset token
    const token = crypto.randomUUID();

    // Create a new password reset token
    await db.insert(passwordResetTokens).values({
      token,
      userId: existingUser.id,
    });

    // Send reset password email
    const resetUrl =
      process.env.NODE_ENV === "production"
        ? `https://app.hackcanada.org/auth/reset-password?token=${token}`
        : `http://localhost:3000/auth/reset-password?token=${token}`;

    await sendResetPasswordEmail({
      name: existingUser.name,
      email: existingUser.email,
      subject: "Reset your Hack Canada password",
      token,
    });

    return NextResponse.json({
      success: true,
      message:
        "A password reset link will be sent to the email if an account is registered under it.",
    });
  } catch (error) {
    console.error("Error during password reset request:", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
}
