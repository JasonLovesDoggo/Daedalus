"use client";

import { UseFormReturn } from "react-hook-form";

import { THackerApplicationDraft } from "@/lib/validations/application";

import { Field } from "./Field";
import { MLHStep } from "./MLHStep";
import { ReviewSection } from "./ReviewSection";

interface ReviewDisplayProps {
  form: UseFormReturn<THackerApplicationDraft>;
}

export function ReviewDisplay({ form }: ReviewDisplayProps) {
  const values = form.watch();

  return (
    <div className="space-y-8 xl:space-y-12">
      <p className="-mt-3 text-textMuted max-md:text-sm md:-mt-6">
        Please review your application carefully before submitting. Note that
        you will not be able to make changes or resubmit your application once
        it has been submitted.
      </p>

      <ReviewSection title="General Information">
        <Field label="First Name" value={values.firstName} />
        <Field label="Last Name" value={values.lastName} />
        <Field label="Age" value={values.age} />
        <Field
          label="Pronouns"
          value={values.pronouns.pronouns}
          customValue={values.pronouns.customPronouns}
        />
        <Field label="Email" value={values.email} />
        <Field label="Gender" value={values.gender} />
        <Field label="Race/Ethnicity" value={values.race} />
        <Field label="country" value={values.country} />
      </ReviewSection>

      <ReviewSection title="Your Background">
        <Field label="School" value={values.school} />
        <Field label="Major" value={values.major} />
        <Field label="Graduation Year" value={values.graduationYear} />
        <Field label="Level of Study" value={values.levelOfStudy} />
        <Field label="Technical Interests" value={values.technicalInterests} />
        <Field label="Hackathons Attended" value={values.hackathonsAttended} />
        <Field label="Github" value={values.github} />
        <Field label="Linkedin" value={values.linkedin} />
        <Field label="Personal Website" value={values.personalWebsite} />
        <Field label="Resume" value={values.resumeUrl} />
        <Field label="Resume" value={values.shareResume ? "True" : "False"} />
      </ReviewSection>

      <ReviewSection title="Short Answers" columns="1">
        <Field label="Short Answer 1" value={values.shortAnswer1} />
        <Field label="Short Answer 2" value={values.shortAnswer2} />
      </ReviewSection>

      <ReviewSection title="MLH Agreements">
        <MLHStep control={form.control} />
      </ReviewSection>
    </div>
  );
}
