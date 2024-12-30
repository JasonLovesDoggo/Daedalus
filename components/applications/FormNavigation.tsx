"use client";

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
      <button type="button" disabled={currentStep === 0} onClick={onPrevious}>
        Previous
      </button>
      {isLastStep ? (
        <button type="submit">Submit</button>
      ) : (
        <button type="button" disabled={isLastStep} onClick={onNext}>
          Next
        </button>
      )}
    </div>
  );
}
