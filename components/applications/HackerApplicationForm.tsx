"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { HackerApplicationsSelectData } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

import { APPLICATION_STEPS } from "../../config/application-form";
import { useHackerApplication } from "../../hooks/useHackerApplication";
import { buttonVariants } from "../ui/button";
import { Form } from "../ui/form";
import { BackgroundEducationStep } from "./BackgroundEducationStep";
import FormErrors from "./FormErrors";
import { FormNavigation } from "./FormNavigation";
import { GeneralInformationStep } from "./GeneralInformationStep";
import { ReviewDisplay } from "./ReviewDisplay";
import { ShortAnswersStep } from "./ShortAnswersStep";
import { StepContentWrapper } from "./StepContentWrapper";
import { StepNavigation } from "./StepNavigation";

type Props = {
  existingApplication: HackerApplicationsSelectData | null;
};

export default function HackerApplicationForm({ existingApplication }: Props) {
  const {
    form,
    currentStep,
    setCurrentStep,
    isSaving,
    isSubmitting,
    validationErrors,
    formErrors,
    submitted,
    onSave,
    onSubmit,
  } = useHackerApplication(existingApplication);

  useEffect(() => {
    if (existingApplication) {
      toast.success("Retrieved existing application!");
    }
  }, [existingApplication]);

  if (submitted) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center md:mt-28 xl:mt-36">
        <h1 className="mb-4 font-rubik text-3xl font-bold md:text-4xl xl:text-5xl">
          🎉🎊 Submitted Successfully! 🎊🎉
        </h1>
        <p className="mb-8 max-w-lg md:text-lg xl:text-xl">
          Your response has been saved, keep an eye out on your emails in the
          coming weeks for updates.
        </p>
        <a
          href="/"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Back to Dashboard
        </a>
      </div>
    );
  }

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
          onSubmit={form.handleSubmit(onSubmit)}
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
