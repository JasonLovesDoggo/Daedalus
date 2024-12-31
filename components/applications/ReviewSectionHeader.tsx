"use client";

interface ReviewSectionHeaderProps {
  title: string;
}

export function ReviewSectionHeader({ title }: ReviewSectionHeaderProps) {
  return (
    <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
    </div>
  );
}
