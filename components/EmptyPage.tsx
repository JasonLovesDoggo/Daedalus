import Link from "next/link";

import { Button } from "./ui/button";
import { MagicCard } from "./ui/magic-card";

interface EmptyPageProps {
  title: string;
  message: string;
}

export const EmptyPage = ({ title, message }: EmptyPageProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <MagicCard
        gradientColor="#87CEEB40"
        className="mx-auto max-w-md bg-white p-4 shadow-lg md:p-8 xl:p-10"
      >
        <div className="space-y-4 text-center">
          <h1 className="mx-auto w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
            {title}
          </h1>
          <p className="pb-2 text-textMuted max-md:text-sm">{message}</p>
          <Link
            href={"/"}
            className="block rounded-md border border-textMuted px-3 py-2 text-base text-textMuted transition-colors hover:border-primaryDark hover:bg-primary hover:text-blue-100"
          >
            Back to Dashboard
          </Link>
        </div>
      </MagicCard>
    </div>
  );
};
