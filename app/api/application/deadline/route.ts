import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";

export const revalidate = 0;

export async function GET(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  const hackerApplicationDeadline = new Date("2025-02-03T23:59:59-05:00");

  return NextResponse.json({
    success: true,
    message: "Successfully retrieved the application deadline.",
    data: {
      deadline: hackerApplicationDeadline.toISOString(),
    },
  });
}
