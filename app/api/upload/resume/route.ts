import { NextResponse } from "next/server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { ApiResponse } from "@/types/api";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  const { fileName, fileType } = await request.json();

  if (!fileName || !fileType) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Validation error",
        error: "Missing required fields",
      },
      { status: 400 },
    );
  }

  if (fileType !== "application/pdf") {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Validation error",
        error: "Only PDF files are allowed",
      },
      { status: 400 },
    );
  }

  const key = `resumes/${Date.now()}-${fileName}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    ContentType: fileType,
  });

  try {
    const url = await getSignedUrl(s3Client, putObjectCommand, {
      expiresIn: 3600, // 1 hour
    });

    return NextResponse.json<ApiResponse<{ url: string; key: string }>>({
      success: true,
      message: "Presigned URL generated successfully",
      data: { url, key },
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Internal server error",
        error: "Failed to generate upload URL",
      },
      { status: 500 },
    );
  }
}
