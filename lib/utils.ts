import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { ApiResponse } from "@/types/api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function for imitating a network request delay
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetcher<T>(
  url: string,
  options?: RequestInit,
): Promise<ApiResponse<T>> {
  const res = await fetch(url, options);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  const data: ApiResponse<T> = await res.json();

  return data;
}

export const getAbsoluteUrl = (path: string) => {
  let baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_APP_URL;

  return `${baseUrl}${path}`;
};

export function generateRandomCode(length: number): string {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  return code;
}
