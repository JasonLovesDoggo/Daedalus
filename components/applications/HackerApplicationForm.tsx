"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { hackerApplicationSchema } from "@/lib/validators/hacker-application";

import { Form } from "../ui/form";
import { BackgroundEducationStep } from "./BackgroundEducationStep";
import { GeneralInformationStep } from "./GeneralInformationStep";
import { MLHStep } from "./MLHStep";
import { ShortAnswersStep } from "./ShortAnswersStep";

const steps = ["General", "Background", "Short Answer", "MLH Agreements"];

export default function HackerApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm({
    resolver: zodResolver(hackerApplicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18,
      pronouns: "",
      email: "",
      github: "",
      linkedin: "",
      personalWebsite: "",
      school: "",
      major: "",
      graduationYear: new Date().getFullYear(),
      gender: "",
      race: "",
      country: "",
      shortAnswer1: "",
      shortAnswer2: "",
      mlhCheckbox1: false,
      mlhCheckbox2: false,
      mlhCheckbox3: false,
      resumeUrl: "",
    },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-primary/30 text-sm transition-all ${
                index === currentStep
                  ? "bg-primary text-white ring-4 ring-primaryLight"
                  : "bg-backgroundMuted text-textMuted hover:bg-primaryLight hover:text-white"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              {index === steps.length - 1 ? "🎉" : index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="mx-2 h-1 w-4 rounded-full bg-primaryLight" />
            )}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form className="">
          <div className="space-y-8">
            {currentStep === 0 && (
              <div className="mx-auto w-full max-w-4xl bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
                <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
                  General Information
                </h1>
                <GeneralInformationStep control={form.control} />
              </div>
            )}
            {currentStep === 1 && (
              <div className="mx-auto w-full max-w-4xl bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
                <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
                  Your Background
                </h1>
                <BackgroundEducationStep control={form.control} />
              </div>
            )}
            {currentStep === 2 && (
              <div className="mx-auto w-full max-w-4xl bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
                <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
                  Short Answers
                </h1>
                <ShortAnswersStep control={form.control} />
              </div>
            )}
            {currentStep === 3 && (
              <div className="mx-auto w-full max-w-4xl bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
                <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
                  MLH Agreements
                </h1>
                <MLHStep control={form.control} />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentStep === steps.length - 1}
              onClick={() => setCurrentStep((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
