import { NextRequest, NextResponse } from "next/server";

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

    if (!existingUser) {
      return NextResponse.json({
        success: true,
        message:
          "A password reset link will be sent to this email if an account is registered under it.",
      });
    }

    // Generate a UUID for the reset token
    const token = crypto.randomUUID();

    // Create a new password reset token
    await db.insert(passwordResetTokens).values({
      token,
      userId: existingUser.id,
    });

    // TODO: Send email with reset link
    // For development purposes only
    console.log("Reset token:", token);

    return NextResponse.json({
      success: true,
      message:
        "A password reset link will be sent to this email if an account is registered under it.",
    });
  } catch (error) {
    console.error("Error during password reset request:", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
}
