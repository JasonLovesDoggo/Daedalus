"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

import { fetcher } from "@/lib/utils";
import ForgotPasswordCard from "@/components/auth/forgot-password/ForgotPasswordCard";

const ForgotPasswordPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <ForgotPasswordCard />
    </div>
  );
};

export default ForgotPasswordPage;
