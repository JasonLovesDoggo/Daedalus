"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  HackerApplicationDraftSchema,
  THackerApplicationDraft,
} from "@/lib/validations/application";

import {
  APPLICATION_STEPS,
  DEFAULT_FORM_VALUES,
} from "../../config/application-form";
import { Form } from "../ui/form";
import { BackgroundEducationStep } from "./BackgroundEducationStep";
import { FormNavigation } from "./FormNavigation";
import { GeneralInformationStep } from "./GeneralInformationStep";
import { ReviewDisplay } from "./ReviewDisplay";
import { ShortAnswersStep } from "./ShortAnswersStep";
import { StepContentWrapper } from "./StepContentWrapper";
import { StepNavigation } from "./StepNavigation";

export default function HackerApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<THackerApplicationDraft>({
    resolver: zodResolver(HackerApplicationDraftSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSave = () => {
    const values = form.getValues();
    const isModified =
      JSON.stringify(values) !== JSON.stringify(DEFAULT_FORM_VALUES);

    if (!isModified) {
      toast.error("No changes to save");
      return;
    }

    console.log("Form draft saved", values);
    toast.success("Application draft saved");
  };

  return (
    <div>
      <StepNavigation
        steps={APPLICATION_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <p>
        {Object.entries(form.formState.errors).map(([key, error]) => (
          <span key={key}>
            {key}: {error.message}
          </span>
        ))}
      </p>

      <Form {...form}>
        <form
          className={cn("mx-auto w-full max-w-4xl", {
            "max-w-5xl": currentStep === 3,
          })}
          onSubmit={form.handleSubmit((values) => {
            if (currentStep !== 3) return;
            console.log("Form submission values", values);
            alert("Form submitted!");
          })}
        >
          <div className="mb-6 space-y-8 md:mb-8">
            {currentStep === 0 && (
              <StepContentWrapper title="General Information">
                <GeneralInformationStep
                  control={form.control}
                  watch={form.watch}
                />
              </StepContentWrapper>
            )}
            {currentStep === 1 && (
              <StepContentWrapper title="Your Background">
                <BackgroundEducationStep
                  control={form.control}
                  watch={form.watch}
                />
              </StepContentWrapper>
            )}
            {currentStep === 2 && (
              <StepContentWrapper title="Short Answers">
                <ShortAnswersStep control={form.control} />
              </StepContentWrapper>
            )}
            {currentStep === 3 && (
              <StepContentWrapper title="Review Application">
                <ReviewDisplay form={form} />
              </StepContentWrapper>
            )}
          </div>

          <hr className="mb-6 md:mb-8" />

          <FormNavigation
            currentStep={currentStep}
            totalSteps={4}
            onPrevious={() => setCurrentStep((prev) => prev - 1)}
            onNext={() => setCurrentStep((prev) => prev + 1)}
            onSave={onSave}
          />
        </form>
      </Form>
    </div>
  );
}
