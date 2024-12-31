"use client";

import { UseFormReturn } from "react-hook-form";

import { MLHStep } from "./MLHStep";

interface ReviewDisplayProps {
  form: UseFormReturn<any>;
}

export function ReviewDisplay({ form }: ReviewDisplayProps) {
  const values = form.watch();

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">General Information</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Name:</span> {values.firstName}{" "}
            {values.lastName}
          </p>
          <p>
            <span className="font-medium">Age:</span> {values.age}
          </p>
          <p>
            <span className="font-medium">Pronouns:</span> {values.pronouns}
          </p>
          <p>
            <span className="font-medium">Email:</span> {values.email}
          </p>
          <p>
            <span className="font-medium">GitHub:</span> {values.github}
          </p>
          <p>
            <span className="font-medium">LinkedIn:</span> {values.linkedin}
          </p>
          <p>
            <span className="font-medium">Website:</span>{" "}
            {values.personalWebsite}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Your Background</h3>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">School:</span> {values.school}
          </p>
          <p>
            <span className="font-medium">Major:</span> {values.major}
          </p>
          <p>
            <span className="font-medium">Graduation Year:</span>{" "}
            {values.graduationYear}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {values.gender}
          </p>
          <p>
            <span className="font-medium">Race/Ethnicity:</span> {values.race}
          </p>
          <p>
            <span className="font-medium">Country:</span> {values.country}
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Short Answers</h3>
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-medium">Short Answer 1:</p>
            <p className="whitespace-pre-line">{values.shortAnswer1}</p>
          </div>
          <div>
            <p className="font-medium">Short Answer 2:</p>
            <p className="whitespace-pre-line">{values.shortAnswer2}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">MLH Agreements</h3>
        <MLHStep control={form.control} />
      </div>
    </div>
  );
}
