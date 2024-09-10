"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

import { fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {};

const SignUpForm = ({}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      startTransition(async () => {
        const res = await fetcher("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        if (res.success) {
          alert(res.message);
          redirect("/sign-in");
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="mb-4">
          <label htmlFor="name">Name</label>
          <Input
            className="w-full rounded-md px-4 py-2"
            type="text"
            {...form.register("name", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <Input
            className="w-full rounded-md px-4 py-2"
            type="email"
            {...form.register("email", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <Input
            className="w-full rounded-md px-4 py-2"
            type="password"
            {...form.register("password", { required: true })}
          />
        </div>
        <Button
          type="submit"
          className="w-full rounded-md py-3 font-semibold"
          disabled={isPending}
        >
          {isPending ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
