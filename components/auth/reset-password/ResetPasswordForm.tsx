"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { fetcher } from "@/lib/utils";
import {
  ResetPasswordInput,
  ResetPasswordSchema,
} from "@/lib/validations/reset-password";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ResetPasswordParamsProps = {
  token: string;
};

const ResetPasswordForm = ({ token }: ResetPasswordParamsProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  console.log("tokebn", token);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token,
    },
  });

  const onSubmit = (values: ResetPasswordInput) => {
    try {
      startTransition(async () => {
        if (values.password !== values["confirmPassword"]) {
          setError("Passwords entered must be the same!");
          return;
        }

        const res = await fetcher("/api/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({
            password: values.password,
            confirmPassword: values.confirmPassword,
            token,
          }),
        });

        if (res.success) {
          redirect("/");
        } else {
          alert(res.message);
          console.log("server side error", res);

          setError(res.message);
        }
      });
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Something bad happened.");
    }
  };

  // TODO: Add Shadcn Form components
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        {Object.entries(form.formState.errors).map(([key, value]) => (
          <p key={key} className="mb-4 text-red-500">
            {value?.message}
          </p>
        ))}
        <div className="">
          <label htmlFor="password">Password</label>
          <Input
            className="w-full rounded-md px-4 py-2"
            type="password"
            {...form.register("password", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Reset Password</label>
          <Input
            className="w-full rounded-md px-4 py-2"
            type="password"
            {...form.register("confirmPassword", { required: true })}
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-md py-3 font-semibold"
          disabled={isPending}
        >
          {isPending ? "Sending password..." : "Reset My Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
