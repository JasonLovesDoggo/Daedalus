"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { hackerApplicationSchema } from "@/lib/validators/hacker-application";

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

  const form = useForm({
    resolver: zodResolver(hackerApplicationSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  return (
    <div>
      <StepNavigation
        steps={APPLICATION_STEPS}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <Form {...form}>
        <form
          className="mx-auto w-full max-w-4xl"
          onSubmit={form.handleSubmit(() => {
            alert("Form submitted!");
          })}
        >
          <div className="mb-4 space-y-8 md:mb-8">
            {currentStep === 0 && (
              <StepContentWrapper title="General Information">
                <GeneralInformationStep control={form.control} />
              </StepContentWrapper>
            )}
            {currentStep === 1 && (
              <StepContentWrapper title="Your Background">
                <BackgroundEducationStep control={form.control} />
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

          <FormNavigation
            currentStep={currentStep}
            totalSteps={APPLICATION_STEPS.length}
            onPrevious={() => setCurrentStep((prev) => prev - 1)}
            onNext={() => setCurrentStep((prev) => prev + 1)}
          />
        </form>
      </Form>
    </div>
  );
}
