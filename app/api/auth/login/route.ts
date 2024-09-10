import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { ApiResponse } from "@/types/api";
import { getUserByEmail } from "@/lib/db/queries/user";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();

    // TODO: Validate the body with a Zod schema

    if (!body.email || !body.password) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const existingUser = await getUserByEmail(body.email);

    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const result = await signIn("credentials", {
      email: body.email,
      password: body.password,
      redirect: false,
    });

    if (!result) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password.",
      });
    }

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
