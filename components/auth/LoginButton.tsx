"use client";

import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  label?: string;
  className?: string;
};

export const LogoutButton = ({
  title,
  className,
  label = "Sign Out",
}: Props) => {
  return (
    <button
      title={title ? "Logout" : undefined}
      onClick={() =>
        signOut({
          callbackUrl: "/sign-in",
        })
      }
      className={cn(
        "rounded-md border px-3.5 py-2 transition-colors hover:bg-secondary",
        className,
      )}
    >
      {label}
    </button>
  );
};
