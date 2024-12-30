"use client";

interface StepContentWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function StepContentWrapper({
  title,
  children,
}: StepContentWrapperProps) {
  return (
    <div className="bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
      <h1 className="mb-4 font-rubik text-3xl font-semibold md:mb-6 md:text-4xl xl:mb-8">
        {title}
      </h1>
      {children}
    </div>
  );
}
