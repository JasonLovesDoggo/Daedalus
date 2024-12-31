"use client";

import { Control } from "react-hook-form";

import { levelsOfStudy } from "@/lib/data/levelsOfStudy";
import { majors } from "@/lib/data/majors";
import { schools } from "@/lib/data/schools";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { AdvancedSelect } from "../ui/advanced-select";
import { Checkbox } from "../ui/checkbox";

interface BackgroundEducationStepProps {
  control: Control<any>;
}

export function BackgroundEducationStep({
  control,
}: BackgroundEducationStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="school"
          render={({ field }) => {
            const loadOptions = (inputValue: string) => {
              return Promise.resolve(
                schools
                  .filter((school) =>
                    school.toLowerCase().includes(inputValue.toLowerCase()),
                  )
                  .map((school) => ({ value: school, label: school })),
              );
            };

            return (
              <FormItem>
                <FormLabel>School/University</FormLabel>
                <FormControl>
                  <AdvancedSelect
                    name="school"
                    value={
                      field.value
                        ? { value: field.value, label: field.value }
                        : null
                    }
                    onChange={field.onChange}
                    loadOptions={loadOptions}
                    placeholder="Search for your school/university"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="major"
          render={({ field }) => {
            const loadOptions = (inputValue: string) => {
              return Promise.resolve(
                majors
                  .filter((major) =>
                    major.toLowerCase().includes(inputValue.toLowerCase()),
                  )
                  .map((major) => ({ value: major, label: major })),
              );
            };

            return (
              <FormItem>
                <FormLabel>Major</FormLabel>
                <FormControl>
                  <AdvancedSelect
                    name="major"
                    value={
                      field.value
                        ? { value: field.value, label: field.value }
                        : null
                    }
                    onChange={field.onChange}
                    loadOptions={loadOptions}
                    placeholder="Search for your major"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="graduationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Graduation Year</FormLabel>
              <FormControl>
                <Input type="number" placeholder="2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="levelOfStudy"
          render={({ field }) => {
            const loadOptions = (inputValue: string) => {
              return Promise.resolve(
                levelsOfStudy
                  .filter((level) =>
                    level.toLowerCase().includes(inputValue.toLowerCase()),
                  )
                  .map((level) => ({ value: level, label: level })),
              );
            };

            return (
              <FormItem>
                <FormLabel>Level of Study</FormLabel>
                <FormControl>
                  <AdvancedSelect
                    name="levelOfStudy"
                    value={
                      field.value
                        ? { value: field.value, label: field.value }
                        : null
                    }
                    onChange={field.onChange}
                    loadOptions={loadOptions}
                    placeholder="Select your level of study"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="technicalInterests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technical Interests</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. AI, Web Development, Cybersecurity"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="hackathonsAttended"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Hackathons Attended</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="github"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://linkedin.com/in/username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="personalWebsite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Website</FormLabel>
              <FormControl>
                <Input placeholder="https://yourwebsite.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <FormField
          control={control}
          name="resumeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <button
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
                    field.onChange(e.dataTransfer.files[0]);
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
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX (max 5MB)
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    id="resume-upload"
                    className="hidden"
                  />
                </div>
              </button>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="resumeSharingConsent"
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
    </div>
  );
}
