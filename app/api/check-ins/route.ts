import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { checkIns } from "@/lib/db/schema";

const checkInSchema = z.object({
  userId: z.string(),
  eventName: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    // Check if user is authenticated and has admin/organizer role
    if (!session || !["admin", "organizer"].includes(session.user.role)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const body = await req.json();
    const { userId, eventName } = checkInSchema.parse(body);

    // Check if user has already checked in for this event
    const existingCheckIn = await db.query.checkIns.findFirst({
      where: and(
        eq(checkIns.userId, userId),
        eq(checkIns.eventName, eventName),
      ),
    });

    if (existingCheckIn) {
      return NextResponse.json(
        { message: "User already checked in for this event" },
        { status: 400 },
      );
    }

    // Create new check-in
    await db.insert(checkIns).values({
      userId,
      eventName,
    });

    return NextResponse.json({
      message: "Check-in successful",
    });
  } catch (error) {
    console.error("Check-in error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request data" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
