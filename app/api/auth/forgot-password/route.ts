import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

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

    await db.transaction(async (tx) => {
      const [existingToken] = await tx
        .select()
        .from(passwordResetTokens)
        .where(eq(passwordResetTokens.userId, existingUser.id));

      if (existingToken) {
        const tokenAge =
          new Date().getTime() - existingToken.createdAt.getTime();

        console.log("Token age:", tokenAge);

        if (tokenAge < 1000 * 60 * 2) {
          console.log("Token age is less than 2 minutes, deleting token");

          // 2 minutes
          return NextResponse.json({
            success: false,
            message:
              "A password reset link was already sent recently. Please check your email.",
          });
        } else {
          console.log("Token age is greater than 2 minutes, continuing");
        }

        await tx
          .delete(passwordResetTokens)
          .where(eq(passwordResetTokens.id, existingToken.id));
      }

      // Generate a UUID for the reset token
      const token = crypto.randomUUID();

      // Create a new password reset token
      await tx.insert(passwordResetTokens).values({
        token,
        userId: existingUser.id,
        createdAt: new Date(),
      });

      const emailResult = await sendResetPasswordEmail({
        name: existingUser.name,
        email: existingUser.email,
        subject: "Reset your Hack Canada password",
        token,
      });

      if (!emailResult.success) {
        return NextResponse.json({
          success: false,
          message:
            "Failed to send reset password email. Please try again later or contact us if the error persists.",
        });
      }
    });

    return NextResponse.json({
      success: true,
      message: "A password reset link has been sent to your email.",
    });
  } catch (error) {
    console.error("Error during password reset request:", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
}
