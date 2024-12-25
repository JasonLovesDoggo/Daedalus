"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function EmailVerificationCard() {
  const router = useRouter();

  const handleSubmit = (code: string) => {
    // For testing purposes, show the code in a toast
    toast.success(`Verification code: ${code}`);

    // Redirect to login after verification
    router.push("/login");
  };

  return (
    <div className="w-full max-w-md space-y-8 rounded-md border p-6 md:p-10">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-muted-foreground">
          Enter the 6-digit code sent to your email
        </p>
      </div>
      <div className="space-y-6">
        <InputOTP maxLength={6} onComplete={handleSubmit}>
          <InputOTPGroup className="mx-auto">
            {[...Array(6)].map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <Button
          variant="link"
          className="w-full text-sm text-muted-foreground"
          onClick={() => router.push("/login")}
        >
          Didn't receive a code? Resend
        </Button>
      </div>
    </div>
  );
}
