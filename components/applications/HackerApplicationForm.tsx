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
import { MLHStep } from "./MLHStep";
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
          <div>
            <h1>errors</h1>
            {Object.entries(form.formState.errors).map(([key, value]) => (
              <p key={key}>
                {key}: {value.message}
              </p>
            ))}
          </div>

          <div className="space-y-8">
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
              <StepContentWrapper title="MLH Agreements">
                <MLHStep control={form.control} />
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
