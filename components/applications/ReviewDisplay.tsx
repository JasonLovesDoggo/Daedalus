"use client";

import { UseFormReturn } from "react-hook-form";

import { Field } from "./Field";
import { MLHStep } from "./MLHStep";
import { ReviewSection } from "./ReviewSection";

interface ReviewDisplayProps {
  form: UseFormReturn<any>;
}

export function ReviewDisplay({ form }: ReviewDisplayProps) {
  const values = form.watch();

  return (
    <div className="space-y-8">
      <div className="-mt-6">
        <p className="pb-2 text-textMuted max-md:text-sm">
          Please review your application carefully before submitting. Note that
          you will not be able to make changes or resubmit your application once
          it has been submitted.
        </p>
        <hr className="border-t-2" />
      </div>

      <ReviewSection title="General Information">
        <Field label="Name" value={`${values.firstName} ${values.lastName}`} />
        <Field label="Age" value={values.age} />
        <Field label="Pronouns" value={values.pronouns} />
        <Field label="Email" value={values.email} />
        <Field label="GitHub" value={values.github} />
        <Field label="LinkedIn" value={values.linkedin} />
        <Field label="Website" value={values.personalWebsite} />
      </ReviewSection>

      <ReviewSection title="Your Background">
        <Field label="School" value={values.school} />
        <Field label="Major" value={values.major} />
        <Field label="Graduation Year" value={values.graduationYear} />
        <Field label="Gender" value={values.gender} />
        <Field label="Race/Ethnicity" value={values.race} />
        <Field label="Country" value={values.country} />
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
