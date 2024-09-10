import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/queries/user";
import { users } from "@/lib/db/schema";

export async function POST(req: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const body = await req.json();
    // TODO: Validate body with Zod

    const existingUser = await getUserByEmail(body.email);

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await db.insert(users).values({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    // TODO: Email verification feature
    return NextResponse.json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.error("Error during registration:", error);

    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
}
