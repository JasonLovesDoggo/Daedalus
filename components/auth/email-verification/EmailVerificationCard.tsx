"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function EmailVerificationCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const token = searchParams.get("token");

  const handleSubmit = async (code: string) => {
    if (!token) {
      setError("Invalid verification link");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/email-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, token }),
      });

      if (!response.ok) {
        throw new Error("Invalid verification code");
      }

      toast.success("Email verified successfully!");
      router.push("/login");
    } catch (error) {
      setError("Invalid verification code. Please try again.");
      toast.error("Invalid verification code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4 rounded-md p-4 md:space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-rubik text-2xl font-semibold md:text-3xl">
          Verify Your Email
        </h1>
        <p className="text-gray-500 max-md:text-sm">
          Enter the 6-digit code sent to your email
        </p>
      </div>
      <div className="space-y-6">
        <InputOTP maxLength={6} onComplete={handleSubmit} disabled={isLoading}>
          <InputOTPGroup className="mx-auto">
            {[...Array(6)].map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="border-textSecondary"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        <Button
          variant="primary"
          className="w-full text-sm"
          onClick={() => router.push("/login")}
          disabled={isLoading}
        >
          Didn't receive a code? Resend
        </Button>
      </div>
      <hr className="border-gray-300" />
      <div className="flex flex-col">
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a
            href="/sign-in"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
