import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { getUserByEmail } from "@/lib/db/queries/user";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // TODO: Validate the body with a Zod schema

    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        {
          status: 400,
        },
      );
    }

    const existingUser = await getUserByEmail(body.email);

    if (!existingUser) {
      return NextResponse.json(
        { error: "Could not find a user with the given email." },
        {
          status: 400,
        },
      );
    }

    const result = await signIn("credentials", {
      email: body.email,
      password: body.password,
      redirect: false,
    });

    if (!result) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        {
          status: 401,
        },
      );
    }

    // If everything is successful
    return NextResponse.json({ success: "Welcome!" });
  } catch (error) {
    console.error("Error during login:", error);

    // Handling known errors
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { error: "Invalid email or password." },
            {
              status: 400,
            },
          );
        case "CallbackRouteError":
          return NextResponse.json(
            { error: cause?.err?.toString() || "Callback error occurred." },
            {
              status: 500,
            },
          );
        default:
          return NextResponse.json(
            { error: "An unknown error occurred." },
            {
              status: 500,
            },
          );
      }
    }

    // Any other unhandled errors
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      },
    );
  }
}
