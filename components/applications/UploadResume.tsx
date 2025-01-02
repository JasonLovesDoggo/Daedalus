"use client";

import { ExternalLink, Trash2 } from "lucide-react";
import { Control, UseFormWatch } from "react-hook-form";

import { THackerApplicationSubmission } from "@/lib/validations/application";
import { useUploadResume } from "@/hooks/useUploadResume";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UploadResumeProps {
  control: Control<THackerApplicationSubmission>;
  watch: UseFormWatch<THackerApplicationSubmission>;
}

export function UploadResume({ control, watch }: UploadResumeProps) {
  const { handleFileUpload, deleteResume, getResumeUrl } = useUploadResume();
  const resumeUrl = watch("resumeUrl");

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="resumeUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resume</FormLabel>
            {!resumeUrl && (
              <button
                type="button"
                className="block w-full cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:bg-gray-50"
                onClick={() =>
                  document.getElementById("resume-upload")?.click()
                }
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("bg-gray-50");
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("bg-gray-50");
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("bg-gray-50");
                  if (e.dataTransfer.files[0]) {
                    handleFileUpload(e.dataTransfer.files[0], field.onChange);
                  }
                }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-gray-600">
                    Drag and drop your resume here, or{" "}
                    <span className="font-medium text-primary">
                      click to upload
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">PDF only (max 5MB)</p>
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(e.target.files[0], field.onChange);
                      }
                    }}
                    id="resume-upload"
                    className="hidden"
                  />
                </div>
              </button>
            )}
            {resumeUrl && (
              <div className="mt-4 flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-gray-500" />
                  <a
                    href={getResumeUrl(resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View Resume
                  </a>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={async () => {
                    if (resumeUrl && (await deleteResume(resumeUrl))) {
                      field.onChange("");
                    }
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="shareResume"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 md:text-base">
                I consent to sharing my resume with potential sponsors and
                recruiters
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
