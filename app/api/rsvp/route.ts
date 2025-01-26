import { NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { rsvp, users } from "@/lib/db/schema";
import { RsvpFormSchema } from "@/lib/validations/rsvp-form";

type RsvpResponse = {
  success?: boolean;
  error?: string;
  alert?: string;
};

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) {
      return NextResponse.json<RsvpResponse>({
        error: "You must be logged in to RSVP.",
      });
    }

    const userId = currentUser.id;

    const body = await req.json();
    const validatedFields = RsvpFormSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json<RsvpResponse>({
        error: "Invalid fields provided.",
      });
    }

    const rsvpData = validatedFields.data;

    // Fetch the user from the database
    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!existingUser) {
      return NextResponse.json<RsvpResponse>({
        error: "User not found.",
      });
    }

    // Ensure that the user has accepted the application and hasn't already RSVPed
    if (
      existingUser.applicationStatus !== "accepted" ||
      existingUser.role === "hacker"
    ) {
      return NextResponse.json<RsvpResponse>({
        error:
          existingUser.applicationStatus !== "accepted"
            ? "You must be accepted to RSVP."
            : "You have already RSVPed.",
      });
    }

    // Start a db transaction
    const result = await db.transaction(async (tx) => {
      // Update user's role to hacker
      await tx
        .update(users)
        .set({
          role: "hacker",
          rsvpAt: new Date(),
        })
        .where(eq(users.id, userId));

      const rsvpInsertData = {
        userId,
        emergencyContactName: rsvpData.emergencyContactName,
        relationshipToParticipant: rsvpData.relationshipToParticipant,
        emergencyContactPhoneNumber: rsvpData.emergencyContactPhoneNumber,
        alternativePhoneNumber: rsvpData.alternativePhoneNumber || null,
        dietaryRestrictions: rsvpData.dietaryRestrictions || null,
        tshirtSize: rsvpData.tshirtSize,
        agreeToTerms: rsvpData.agreeToTerms,
        mediaConsent: rsvpData.mediaConsent,
      };

      await tx.insert(rsvp).values(rsvpInsertData);

      return { success: true } as RsvpResponse;
    });

    return NextResponse.json<RsvpResponse>(result);
  } catch (error) {
    console.error("ERROR FROM RSVP API - INTERNAL SERVER ERROR", error);
    return NextResponse.json<RsvpResponse>({
      error: "An unexpected error occurred. Please try again.",
    });
  }
}
