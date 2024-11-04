"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

import { ResetPasswordParamsProps } from "@/types/app";
import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ResetPasswordForm = ({ params }: ResetPasswordParamsProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      password: "",
      "reset-password": "",
    },
  });

  const onSubmit = (values: { password: string; "reset-password": string }) => {
    try {
      startTransition(async () => {
        if (values.password !== values["reset-password"]) {
          setError("Passwords entered must be the same!");
          return;
        }
        const res = await fetcher("/api/auth/reset-password", {
          method: "POST",
          body: JSON.stringify({
            password: values.password,
            token: params.token,
          }),
        });

        if (res.success) {
          redirect("/");
        } else {
          alert(res.message);
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
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="">
          <label htmlFor="password">Password</label>
          <Input
            className="w-full rounded-md px-4 py-2"
            type="password"
            {...form.register("password", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="reset-password">Reset Password</label>
          <Input
            className="w-full rounded-md px-4 py-2"
            type="password"
            {...form.register("reset-password", { required: true })}
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
