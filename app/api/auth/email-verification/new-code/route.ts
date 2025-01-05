import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import { db } from "@/lib/db";
import {
  createVerificationToken,
  deleteExpiredTokens,
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from "@/lib/db/queries/email-verification-tokens";
import { getUserByEmail } from "@/lib/db/queries/user";

type ResponseData = {
  tokenId: string;
};

export async function POST(
  req: Request,
): Promise<NextResponse<ApiResponse<ResponseData>>> {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required",
      });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      });
    }

    // Delete any expired tokens first
    await deleteExpiredTokens(email);

    // Check for existing verification tokens
    const existingTokens = await getVerificationTokenByEmail(email);

    // If there's an active token within the last 2 minutes
    const activeToken = existingTokens.find((token) => {
      // Convert createdAt to UTC and calculate age
      const createdAtUTC = new Date(token.createdAt.toISOString());
      const tokenAge = Date.now() - createdAtUTC.getTime();
      return tokenAge < 2 * 60 * 1000;
    });

    if (activeToken) {
      // Convert createdAt to UTC and calculate remaining time
      const createdAtUTC = new Date(activeToken.createdAt.toISOString());
      const tokenAge = Date.now() - createdAtUTC.getTime();
      const remainingSeconds = Math.ceil((2 * 60 * 1000 - tokenAge) / 1000);
      return NextResponse.json({
        success: false,
        message: `Please wait ${remainingSeconds} seconds before requesting a new code`,
      });
    }

    // Delete any remaining tokens for this email
    await Promise.all(
      existingTokens.map((token) => deleteVerificationTokenById(token.id)),
    );

    // Create new verification token
    let tokenId = "";
    await db.transaction(async (tx) => {
      const result = await createVerificationToken(email);
      tokenId = result.tokenId;
    });

    // TODO: Send verification email here
    // await sendVerificationEmail({
    //   email,
    //   name: existingUser.name,
    //   token: tokenId,
    // });

    return NextResponse.json({
      success: true,
      message: "Verification code sent",
      data: { tokenId },
    });
  } catch (error) {
    console.error("Error generating new verification code:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to generate new code. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
