import { NextResponse } from "next/server";

import { ApiResponse } from "@/types/api";
import {
  createVerificationToken,
  deleteExpiredTokens,
  deleteVerificationTokenById,
  getVerificationTokenByEmail,
} from "@/lib/db/queries/email-verification-tokens";
import { getUserByEmail } from "@/lib/db/queries/user";
import { EmailValidationSchema } from "@/lib/validations/email-verification";

type ResponseData = {
  tokenId: string;
};

export async function POST(
  req: Request,
): Promise<NextResponse<ApiResponse<ResponseData>>> {
  try {
    const body = await req.json();

    const validatedFields = EmailValidationSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json({
        success: false,
        message: validatedFields.error.message,
      });
    }

    const { data } = validatedFields;

    const existingUser = await getUserByEmail(data.email);
    if (!existingUser || existingUser.emailVerified) {
      return NextResponse.json({
        success: false,
        // Do not let the user know if the email is invalid
        message: "Failed to send verification code to the provided email.",
      });
    }

    // Delete any expired tokens first
    await deleteExpiredTokens(data.email);

    // Check for existing verification tokens
    const existingTokens = await getVerificationTokenByEmail(data.email);

    // If there's an active token within the last 2 minutes
    const activeToken = existingTokens.find((token) => {
      // Convert createdAt to UTC and calculate age
      const createdAtUTC = new Date(token.createdAt.toISOString());
      const tokenAge = Date.now() - createdAtUTC.getTime();
      return tokenAge < 2 * 60 * 1000;
    });

    if (activeToken) {
      return NextResponse.json({
        success: false,
        message: `Please wait 2 minutes before requesting for a new code.`,
      });
    }

    // Delete any remaining tokens for this email
    await Promise.all(
      existingTokens.map((token) => deleteVerificationTokenById(token.id)),
    );

    // Create new verification token
    const { code, tokenId } = await createVerificationToken(data.email);

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
    console.error("Error generating new verification code", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: "Something went wrong. Please try again later.",
    });
  }
}
