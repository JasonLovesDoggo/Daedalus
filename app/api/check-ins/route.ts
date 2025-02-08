import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "@/auth";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import type { ApiResponse } from "@/types/api";
import { EVENTS, type Event } from "@/config/qr-code";
import { db } from "@/lib/db";
import { auditLogs, checkIns, type CheckIn } from "@/lib/db/schema";
import { isOrganizer } from "@/lib/utils";

interface CheckInRequest {
  userId: string;
  eventName: Event;
}

// Validate request body
const checkInSchema: z.ZodType<CheckInRequest> = z.object({
  userId: z.string().uuid(),
  eventName: z.enum(EVENTS),
});

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<CheckIn>>> {
  try {
    const currentUser = await getCurrentUser();

    // Check if user is authenticated and has admin/organizer role
    if (!currentUser?.id || !isOrganizer(currentUser.role)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          error: "Insufficient permissions",
        },
        { status: 401 },
      );
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
        {
          success: false,
          message: "User already checked in for this event",
          error: "Duplicate check-in",
        },
        { status: 400 },
      );
    }

    // Create new check-in
    const [newCheckIn] = await db
      .insert(checkIns)
      .values({
        userId,
        eventName,
      })
      .returning();

    // Log the action
    await db.insert(auditLogs).values({
      userId: currentUser.id,
      action: "create",
      entityType: "check_in",
      entityId: newCheckIn.id,
      metadata: JSON.stringify({ eventName }),
    });

    return NextResponse.json({
      success: true,
      message: "Check-in successful",
      data: newCheckIn,
    });
  } catch (error) {
    console.error("Check-in error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data",
          error: error.errors[0].message,
        },
        { status: 400 },
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: errorMessage,
      },
      { status: 500 },
    );
  }
}
