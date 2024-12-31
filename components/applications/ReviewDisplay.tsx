"use client";

import { UseFormReturn } from "react-hook-form";

import { MLHStep } from "./MLHStep";

function Field({ label, value }: { label: string; value: string | number }) {
  const isEmpty = typeof value === "string" ? value.trim() === "" : !value;
  return (
    <div className="space-y-1">
      <p className="font-medium text-gray-600 max-md:text-sm">{label}</p>
      <p
        className={`md:text-lg ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
      >
        {isEmpty ? "[Empty]" : value}
      </p>
    </div>
  );
}

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
      <div>
        <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h3 className="mb-4 text-lg font-semibold">General Information</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Name"
            value={`${values.firstName} ${values.lastName}`}
          />
          <Field label="Age" value={values.age} />
          <Field label="Pronouns" value={values.pronouns} />
          <Field label="Email" value={values.email} />
          <Field label="GitHub" value={values.github} />
          <Field label="LinkedIn" value={values.linkedin} />
          <Field label="Website" value={values.personalWebsite} />
        </div>
      </div>

      <div>
        <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h3 className="mb-4 text-lg font-semibold">Your Background</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="School" value={values.school} />
          <Field label="Major" value={values.major} />
          <Field label="Graduation Year" value={values.graduationYear} />
          <Field label="Gender" value={values.gender} />
          <Field label="Race/Ethnicity" value={values.race} />
          <Field label="Country" value={values.country} />
        </div>
      </div>

      <div>
        <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h3 className="mb-4 text-lg font-semibold">Short Answers</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6 xl:gap-8">
          <div>
            <Field label="Short Answer 1" value={values.shortAnswer1} />
          </div>
          <div>
            <Field label="Short Answer 2" value={values.shortAnswer2} />
          </div>
        </div>
      </div>

      <div>
        <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h3 className="mb-4 text-lg font-semibold">MLH Agreements</h3>
        </div>
        <MLHStep control={form.control} />
      </div>
    </div>
  );
}
