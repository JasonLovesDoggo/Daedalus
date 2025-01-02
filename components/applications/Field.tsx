"use client";

interface FieldProps {
  label: string;
  value: string | number | undefined;
  customValue?: string;
}

export function Field({ label, value, customValue }: FieldProps) {
  const isEmpty = typeof value === "string" ? value.trim() === "" : !value;

  return (
    <div className="space-y-1 overflow-hidden">
      <p className="text-sm font-medium text-gray-600 max-md:text-xs">
        {label}
      </p>
      <p
        className={`truncate whitespace-pre-line break-words md:text-lg ${isEmpty ? "text-gray-400" : "text-gray-900"}`}
      >
        {isEmpty ? "[Empty]" : customValue ? customValue : value}
      </p>
    </div>
  );
}
