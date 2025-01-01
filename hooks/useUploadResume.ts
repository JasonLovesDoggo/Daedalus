import { useState } from "react";
import { toast } from "sonner";

export function useUploadResume() {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (
    file: File,
    onChange: (url: string) => void,
  ) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    try {
      setIsUploading(true);

      // Get presigned URL from API
      const response = await fetch("/api/upload/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }

      const { url, key } = await response.json();

      // Upload file to S3
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      // Return the S3 key or URL
      onChange(key);
      toast.success("Resume uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload resume");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    handleFileUpload,
    isUploading,
  };
}
