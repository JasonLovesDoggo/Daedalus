"use client";

import { Control, useForm } from "react-hook-form";

import { levelsOfStudy } from "@/lib/data/levelsOfStudy";
import { majors } from "@/lib/data/majors";
import { schools } from "@/lib/data/schools";
import { technicalFields } from "@/lib/data/technicalFields";
import { THackerApplicationDraft } from "@/lib/validations/application";
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
import { UploadResume } from "./UploadResume";

interface BackgroundEducationStepProps {
  control: Control<THackerApplicationDraft>;
}

export function BackgroundEducationStep({
  control,
}: BackgroundEducationStepProps) {
  const form = useForm();

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

      <div className="space-y-4">
        <FormField
          control={control}
          name="technicalInterests"
          render={({ field }) => {
            const selected = field.value ? field.value.split(",") : [];

            const handleChange = (value: string, checked: boolean) => {
              let newSelected = [...selected];
              if (checked) {
                if (newSelected.length < 3) {
                  newSelected.push(value);
                }
              } else {
                newSelected = newSelected.filter((v) => v !== value);
              }
              field.onChange(newSelected.join(","));
            };

            return (
              <FormItem>
                <FormLabel>Technical Interests (Select up to 3)</FormLabel>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {technicalFields.map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={field}
                        checked={selected.includes(field)}
                        onCheckedChange={(checked) =>
                          handleChange(field, !!checked)
                        }
                        disabled={
                          selected.length >= 3 && !selected.includes(field)
                        }
                      />
                      <label
                        htmlFor={field}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {field}
                      </label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
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

      <UploadResume control={control} />
    </div>
  );
}
