import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";

import { ApiResponse } from "@/types/api";
import { upsertProfile } from "@/lib/db/queries/profile";
import { profileSchema } from "@/lib/validations/profile";

export async function PUT(
  req: NextRequest,
): Promise<NextResponse<ApiResponse<any>>> {
  try {
    const user = await getCurrentUser();
    if (!user?.id) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "Authentication required",
        },
        { status: 401 },
      );
    }

    if (user.role === "unassigned") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Unauthorized",
          error: "User does not have required role to create a profile",
        },
        { status: 403 },
      );
    }

    const body = await req.json();

    // Validate request body
    const validationResult = profileSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid profile data",
          error: validationResult.error.message,
        },
        { status: 400 },
      );
    }

    await upsertProfile(user.id, validationResult.data);

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("[PROFILE_UPDATE]", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Failed to update profile",
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
