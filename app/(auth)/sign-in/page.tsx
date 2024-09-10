"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

import { fetcher } from "@/lib/utils";
import SignInCard from "@/components/auth/sign-in/SignInCard";

const SignInPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <SignInCard />
    </div>
  );
};

export default SignInPage;
