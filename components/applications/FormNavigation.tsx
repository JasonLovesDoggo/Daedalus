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

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        type="button"
        disabled={currentStep === 0}
        onClick={onPrevious}
        className="px-8 md:text-base"
      >
        Previous
      </Button>
      {isLastStep ? (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      ) : (
        <Button
          variant="outline"
          type="button"
          disabled={isLastStep}
          onClick={onNext}
          className="px-8 md:text-base"
        >
          Next
        </Button>
      )}
    </div>
  );
}
