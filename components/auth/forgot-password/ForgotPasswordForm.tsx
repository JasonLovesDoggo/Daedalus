"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { fetcher } from "@/lib/utils";
import { ForgotPasswordSchema } from "@/lib/validations/forgot-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {};

const ForgotPasswordForm = ({}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
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
          toast.success(res.message);
        } else {
          toast.error(res.message);
          setError(res.message);
        }
      });
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Something bad happened.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && <p className="mb-4 text-red-500">{error}</p>}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Sending Email..." : "Reset My Password"}
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
