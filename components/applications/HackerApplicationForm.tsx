"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import {
  HackerApplicationDraftSchema,
  HackerApplicationSubmissionSchema,
  THackerApplicationSubmission,
} from "@/lib/validations/application";

import {
  APPLICATION_STEPS,
  DEFAULT_FORM_VALUES,
} from "../../config/application-form";
import { Form } from "../ui/form";
import { BackgroundEducationStep } from "./BackgroundEducationStep";
import FormErrors from "./FormErrors";
import { FormNavigation } from "./FormNavigation";
import { GeneralInformationStep } from "./GeneralInformationStep";
import { ReviewDisplay } from "./ReviewDisplay";
import { ShortAnswersStep } from "./ShortAnswersStep";
import { StepContentWrapper } from "./StepContentWrapper";
import { StepNavigation } from "./StepNavigation";

export default function HackerApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<THackerApplicationSubmission>({
    resolver: zodResolver(HackerApplicationSubmissionSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const formErrors = Object.entries(form.formState.errors);

  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    [string, { message: string }][]
  >([]);
  const router = useRouter();

  const onSave = async () => {
    const values = form.getValues();
    const isModified =
      JSON.stringify(values) !== JSON.stringify(DEFAULT_FORM_VALUES);

    if (!isModified) {
      toast.error("No changes to save");
      return;
    }

    const validatedFields = HackerApplicationDraftSchema.safeParse(values);

    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors as Record<
        string,
        string[] | undefined
      >;
      const errors = Object.entries(fieldErrors).map(([field, messages]) => [
        field,
        { message: messages?.join(", ") || "" },
      ]) as [string, { message: string }][];
      setValidationErrors(errors);
      return;
    }
    setValidationErrors([]);

    setIsSaving(true);
    try {
      const response = await fetch("/api/application/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to save application");
      }

      toast.success("Application draft saved");
      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save application";
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <StepNavigation
        steps={APPLICATION_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <Form {...form}>
        <form
          className={cn("mx-auto w-full max-w-4xl", {
            "max-w-5xl": currentStep === 3,
          })}
          onSubmit={form.handleSubmit(async (values) => {
            if (currentStep !== 3) return;

            setIsSubmitting(true);
            try {
              const response = await fetch("/api/application/submit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });

              const result = await response.json();

              if (!result.success) {
                throw new Error(
                  result.message || "Failed to submit application",
                );
              }

              toast.success("Application submitted successfully!");
              router.push("/dashboard");
            } catch (error) {
              const message =
                error instanceof Error
                  ? error.message
                  : "Failed to submit application";
              toast.error(message);
            } finally {
              setIsSubmitting(false);
            }
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

            <FormErrors errors={formErrors} />
            <FormErrors saveErrors errors={validationErrors} />
          </div>

          <hr className="mb-6 md:mb-8" />

          <FormNavigation
            currentStep={currentStep}
            totalSteps={4}
            onPrevious={() => setCurrentStep((prev) => prev - 1)}
            onNext={() => setCurrentStep((prev) => prev + 1)}
            onSave={onSave}
            isSaving={isSaving}
            isSubmitting={isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
}
