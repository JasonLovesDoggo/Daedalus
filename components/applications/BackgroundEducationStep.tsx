"use client";

import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BackgroundEducationStepProps {
  control: Control<any>;
}

export function BackgroundEducationStep({
  control,
}: BackgroundEducationStepProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="school"
        render={({ field }) => (
          <FormItem>
            <FormLabel>School/University</FormLabel>
            <FormControl>
              <Input placeholder="University of Example" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="major"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Major</FormLabel>
            <FormControl>
              <Input placeholder="Computer Science" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
        render={({ field }) => (
          <FormItem>
            <FormLabel>Level of Study</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your level of study" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

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

      <FormField
        control={control}
        name="resumeUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Resume</FormLabel>
            <FormControl>
              <Input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => field.onChange(e.target.files?.[0])}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
