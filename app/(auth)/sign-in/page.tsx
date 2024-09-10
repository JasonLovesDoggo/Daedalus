"use client";

import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";

import { getAbsoluteUrl } from "@/lib/utils";

const SignInPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: { email: string; password: string }) => {
    console.log("values", values);

    startTransition(async () => {
      try {
        const url = getAbsoluteUrl("/api/auth/login");
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        const result = await response.json();

        if (result.error) {
          setError(result.error);
        } else {
          redirect("/");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md rounded-lg bg-zinc-800 p-8 shadow-md"
      >
        <h1 className="mb-6 text-center text-3xl font-bold text-zinc-100">
          Sign In
        </h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-zinc-400"
          >
            Email
          </label>
          <input
            className="w-full rounded-md border border-zinc-600 bg-zinc-700 px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            type="email"
            {...form.register("email", { required: true })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-zinc-400"
          >
            Password
          </label>
          <input
            className="w-full rounded-md border border-zinc-600 bg-zinc-700 px-4 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-500"
            type="password"
            {...form.register("password", { required: true })}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-zinc-600 py-3 font-semibold text-zinc-100 transition duration-300 hover:bg-zinc-500"
          disabled={isPending}
        >
          {isPending ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
