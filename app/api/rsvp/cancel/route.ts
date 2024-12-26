import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in to cancel your RSVP",
      });
    }

    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User ID is required",
      });
    }

    if (currentUser.id !== userId) {
      return NextResponse.json({
        success: false,
        message: "You can only cancel your own RSVP",
      });
    }

    if (currentUser.role !== "hacker") {
      return NextResponse.json({
        success: false,
        message: "You must be an accepted hacker to cancel your RSVP",
      });
    }

    // Update user status
    await db
      .update(users)
      .set({
        role: "unassigned",
        rsvpAt: new Date(0), // Set to Unix epoch time
        applicationStatus: "cancelled",
      })
      .where(eq(users.id, currentUser.id));

    return NextResponse.json({
      success: true,
      message: "RSVP cancelled successfully",
    });
  } catch (error) {
    console.error("Error cancelling RSVP:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to cancel RSVP. Please try again.",
    });
  }
}
