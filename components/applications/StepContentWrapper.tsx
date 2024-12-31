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
    <div className="space-y-4 md:space-y-6 xl:space-y-8">
      <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
        <h1 className="font-rubik text-3xl font-semibold md:text-4xl">
          {title}
        </h1>
      </div>
      {children}
    </div>
  );
}
