"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function Tabs() {
  const pathname = usePathname();
  const activeTab = pathname?.includes("sign-up") ? "sign-up" : "sign-in";

  return (
    <div className="absolute left-1/2 top-12 flex w-fit -translate-x-1/2 gap-4 rounded-full border-2 border-white bg-white/10 p-1 backdrop-blur-sm md:top-20">
      <Link
        href="/sign-in"
        className={cn(
          "relative text-sm font-medium transition-colors hover:text-primary",
          activeTab === "sign-in" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {activeTab === "sign-in" && (
          <motion.div
            layoutId="underline"
            className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-primary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          "relative text-sm font-medium transition-colors hover:text-primary",
          activeTab === "sign-up" ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {activeTab === "sign-up" && (
          <motion.div
            layoutId="underline"
            className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-primary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        Sign Up
      </Link>
    </div>
  );
}
