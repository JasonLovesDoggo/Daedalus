"use server";

import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";

import { getUserByEmail } from "@/lib/db/queries/user";

export const login = async (values: { email: string; password: string }) => {
  const email = values.email;
  const password = values.password;

  try {
    // Validate the body
    if (!email || !password) {
      return {
        error: "Email and password are required.",
      };
    }

    const existingUser = await getUserByEmail(email as string);

    if (!existingUser) {
      return {
        error: "Could not find a user with the given email.",
      };
    }

    // Prevent default redirect behavior and handle sign in
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (!result) {
      return { error: "Invalid email or password." };
    }

    // If everything is successful
    return { success: "Login successful", result };
  } catch (error) {
    console.error("Error during login:", error);

    // Handle known error types
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };

        case "CallbackRouteError":
          return {
            error: cause?.err?.toString() || "Callback error occurred.",
          };
        default:
          return { error: "An unknown error occurred." };
      }
    }

    // Handle unexpected errors with a generic response
    return { error: "An unexpected error occurred." };
  }
};
