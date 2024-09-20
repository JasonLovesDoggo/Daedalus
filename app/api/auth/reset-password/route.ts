import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { ApiResponse } from "@/types/api";
import { getUserByEmail } from "@/lib/db/queries/user";
import { ResetPasswordSchema } from "@/lib/validations/reset-password";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    const validatedFields = ResetPasswordSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // TODO: figure out a better schema when implement the reset password flow
    const { password } = validatedFields.data;

    // const existingUser = await getUserByEmail(email);

    // if (!existingUser) {
    //   return NextResponse.json({
    //     success: false,
    //     message: "Invalid email or password.",
    //   });
    // }

    // TODO: Email verification goes here

    // If everything is successful
    return NextResponse.json({
      success: true,
      message: "Welcome!",
    });
  } catch (error) {
    console.error("Error during login:", error);

    // Handling known errors
    if (error instanceof Error) {
      const { type } = error as AuthError;
      if (type === "CredentialsSignin") {
        return NextResponse.json({
          success: false,
          message: "Invalid email or password.",
        });
      }
    }

    // Any other unhandled errors
    return NextResponse.json({
      success: false,
      message: "Something went wrong, please try again.",
    });
  }
}
