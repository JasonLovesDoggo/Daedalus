"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

type Props = {
  className?: string;
};

export function BackButton({ className }: Props) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
        className,
      )}
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
}
