"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function Tabs() {
  const pathname = usePathname();
  const activeTab = pathname?.includes("sign-up") ? "sign-up" : "sign-in";
  return (
    <div className="mb-8 flex gap-4">
      <Link
        href="/sign-in"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          activeTab === "sign-in" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          activeTab === "sign-up" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}
