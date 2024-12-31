"use client";

import { Button } from "../ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        type="button"
        disabled={isFirstStep}
        onClick={onPrevious}
        className="px-8 md:text-base"
      >
        Previous
      </Button>
      {isLastStep ? (
        <Button variant="primary" type="submit" className="px-10 md:text-base">
          Submit
        </Button>
      ) : (
        <Button
          variant="outline"
          type="button"
          disabled={isLastStep}
          onClick={() => {
            if (currentStep < totalSteps - 1) {
              onNext();
            }
          }}
          className="px-8 md:text-base"
        >
          Next
        </Button>
      )}
    </div>
  );
}
