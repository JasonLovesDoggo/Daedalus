"use client";

import { useState } from "react";

const steps = ["General", "Background", "Short Answer", "Review"];

export default function HackerApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-sm transition-all ${
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

      <div className="space-y-8">
        {currentStep === 0 && (
          <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
              General Information
            </h1>
          </div>
        )}
        {currentStep === 1 && (
          <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
              Your Background
            </h1>
          </div>
        )}
        {currentStep === 2 && (
          <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
              Short Answers
            </h1>
          </div>
        )}
        {currentStep === 3 && (
          <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
              Review & Submit
            </h1>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          disabled={currentStep === steps.length - 1}
          onClick={() => setCurrentStep((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
