"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { fetcher } from "@/lib/utils";
import { NewCodeSchema } from "@/lib/validations/email-verification";
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

export default function NewCodeForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(NewCodeSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: { email: string }) => {
    try {
      startTransition(async () => {
        const { data, success, message } = await fetcher<{
          tokenId: string;
        }>("/api/auth/email-verification/new-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!success || !data) {
          toast.error(message || "Failed to send new code");
          setError(message || "Failed to send new code");
          return;
        }

        const { tokenId } = data;
        form.reset();
        toast.success("New verification code sent!");
        router.push(`/email-verification?token=${tokenId}`);
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send new code";
      console.error("Error:", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="rounded-md border border-error/50 bg-error/10 p-2">
            <p className="text-sm text-error">{error}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your email"
                  className="rounded-sm"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="auth"
          type="submit"
          className="w-full text-sm"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Send New Code"}
        </Button>
      </form>
    </Form>
  );
}
