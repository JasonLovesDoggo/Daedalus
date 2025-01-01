"use client";

import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

type FormError =
  | FieldError
  | Merge<FieldError, FieldErrorsImpl<any>>
  | (Record<string, any> & Partial<{ type: string | number; message: string }>);

interface FormErrorsProps {
  errors: [string, FormError][];
}

const formatErrorKey = (key: string) => {
  // Handle camelCase to Title Case conversion
  const result = key.replace(/([A-Z])/g, " $1");
  // Handle special cases
  if (key === "mlhCheckbox1") return "MLH Code of Conduct";
  if (key === "mlhCheckbox2") return "MLH Privacy Policy";
  if (key === "mlhCheckbox3") return "MLH Communication Consent";
  // Capitalize first letter of each word
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export default function FormErrors({ errors }: FormErrorsProps) {
  if (errors.length === 0) return null;

  return (
    <div className="rounded-md border-2 border-error/50 bg-error/10 p-4 md:p-8">
      {errors.map(([key, error]) => (
        <p key={key} className="text-error">
          {formatErrorKey(key)}:{" "}
          {typeof error?.message === "string" ? error.message : "Invalid value"}
        </p>
      ))}
    </div>
  );
}
