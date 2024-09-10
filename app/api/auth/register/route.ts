import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/queries/user";
import { users } from "@/lib/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: Validate body with Zod

    const existingUser = await getUserByEmail(body.email);

    if (existingUser) {
      return NextResponse.json(
        { error: "User with given email already exists." },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await db.insert(users).values({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    // TODO: Email verification feature
    return NextResponse.json({
      success: "Account created successfully.",
    });
  } catch (error) {
    console.error("Error during registration:", error);

    return NextResponse.json(
      { error: "An unexpected error occurred." },
      {
        status: 500,
      },
    );
  }
}
