"use client";

import { Button } from "../ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
}: FormNavigationProps) {
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row">
      <div className="flex w-full gap-4 sm:justify-between">
        <Button
          variant="outline"
          type="button"
          disabled={isFirstStep}
          onClick={onPrevious}
          className="px-8 max-sm:w-full md:text-base"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={onSave}
          className="w-full px-8 sm:w-auto md:text-base"
        >
          Save for Later
        </Button>
      </div>
      <div className="flex w-full gap-4 sm:w-auto">
        {isLastStep ? (
          <Button
            variant="primary"
            type="submit"
            className="px-10 max-sm:w-full md:text-base"
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="outline"
            type="button"
            disabled={isLastStep}
            onClick={(e) => {
              e.preventDefault();
              if (currentStep < 3) {
                onNext();
              }
            }}
            className="px-8 max-sm:w-full md:text-base"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
