"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "./button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      onClick={() => router.back()}
    >
      <ArrowLeft className="size-4" />
      Back
    </Button>
  );
}
