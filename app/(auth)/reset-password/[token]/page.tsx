"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

import { ResetPasswordParamsProps } from "@/types/app";
import { fetcher } from "@/lib/utils";
import ResetPasswordCard from "@/components/auth/reset-password/ResetPasswordCard";
import SignInCard from "@/components/auth/sign-in/SignInCard";

const ResetPasswordPage = ({ params }: ResetPasswordParamsProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      password: "",
    },
  });

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <ResetPasswordCard params={params} />
    </div>
  );
};

export default ResetPasswordPage;
