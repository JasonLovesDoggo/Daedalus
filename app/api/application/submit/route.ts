import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/auth";

import { ApiResponse } from "@/types/api";
import {
  getHackerApplicationByUserId,
  submitApplication,
} from "@/lib/db/queries/application";
import { HackerApplicationSubmissionSchema } from "@/lib/validations/application";

// TODO figure out how / when submit will be called
// e.g. ensure /save is called before /submit

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) {
      return NextResponse.json({
        success: false,
        message: "You must be logged in to submit an application",
      });
    }

    const body = await req.json();

    if (currentUser.role !== "unassigned") {
      return NextResponse.json({
        success: false,
        message:
          "You must not have received a decision to submit an application",
      });
    }

    const validationResult = HackerApplicationSubmissionSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = Object.values(
        validationResult.error.flatten().fieldErrors,
      )
        .flat()
        .join(", ");
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application data",
          error: errorMessages,
        },
        { status: 400 },
      );
    }

    // Convert string fields to numbers
    const age = parseInt(validationResult.data.age);
    const graduationYear = parseInt(validationResult.data.graduationYear);

    // Convert object fields to strings
    const pronouns =
      validationResult.data.pronouns.customValue ||
      validationResult.data.pronouns.value;
    const school =
      validationResult.data.school.customValue ||
      validationResult.data.school.value;
    const major =
      validationResult.data.major.customValue ||
      validationResult.data.major.value;

    const application = await getHackerApplicationByUserId(currentUser.id);

    if (!application) {
      return NextResponse.json({
        success: false,
        message: "Application must have been started and saved to submit",
      });
    }

    if (application.submissionStatus !== "draft") {
      return NextResponse.json({
        success: false,
        message: "Application has already been submitted",
      });
    }

    const applicationData = {
      ...application,
      age,
      pronouns,
      school,
      major,
      graduationYear,
      submissionStatus: "submitted",
      submittedAt: new Date(),
    };

    const updatedApplication = await submitApplication(applicationData);

    if (!updatedApplication.success) {
      console.error(
        "Error submitting application: ",
        updatedApplication.errors,
      );
      return NextResponse.json({
        success: false,
        message: "Failed to submit application. Please try again.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      data: updatedApplication,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to submit application. Please try again.",
    });
  }
}
