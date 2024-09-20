"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {};

const ForgotPasswordForm = ({}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: { email: string }) => {
    try {
      startTransition(async () => {
        const res = await fetcher("/api/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({
            email: values.email,
          }),
        });

        if (res.success) {
          // alert(res.message);
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
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Input
            className="w-full rounded-md px-4 py-2"
            type="email"
            {...form.register("email", { required: true })}
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-md py-3 font-semibold"
          disabled={isPending}
        >
          {isPending ? "Sending Email..." : "Reset My Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
