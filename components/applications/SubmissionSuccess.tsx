"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

import { buttonVariants } from "../ui/button";

export default function SubmissionSuccess() {
  return (
    <div className="relative mt-10 w-full px-4 sm:px-6 md:mt-28 md:max-w-4xl xl:mt-36">
      {/* Beaver wave image */}
      <div className="pointer-events-none absolute -bottom-32 right-0 size-32 sm:-bottom-12 sm:right-4 sm:size-48 md:-bottom-24 md:right-56 md:size-64 lg:right-44 xl:-bottom-16 xl:right-56">
        <Image
          src="/beaver-wave.webp"
          alt="Beaver waving"
          width={256}
          height={256}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="pointer-events-none absolute -bottom-32 left-0 size-32 -scale-x-100 sm:-bottom-12 sm:right-4 sm:size-48 md:hidden">
        <Image
          src="/beaver-wave.webp"
          alt="Beaver waving"
          width={256}
          height={256}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Main content */}
      <div className="text-center md:text-left">
        {/* Emoji for all screens */}
        <div className="absolute -top-4 right-4 text-4xl xs:right-12 sm:-top-8 sm:right-24 sm:text-6xl md:right-20 md:text-7xl xl:-top-16 xl:right-4 xl:text-8xl">
          🎉
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-4 md:mb-10 xl:mb-12">
          <div className="text-4xl font-bold md:text-4xl xl:text-5xl">
            <div className="bg-gradient-to-r from-blue-400 via-sky-400 to-primary/70 bg-clip-text text-transparent">
              <h1 className="font-rubik">Submitted!</h1>
            </div>
          </div>
          <p className="text-sm text-textMuted sm:text-base md:text-lg xl:text-xl">
            Your response has been saved, keep an eye out on your emails in the
            coming weeks for updates.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-3 sm:gap-4 md:w-fit md:items-start">
          <a
            href="/applications/hacker/review"
            className="group flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 px-4 py-2 text-sm transition-all duration-200 hover:bg-primary hover:text-white hover:shadow-lg sm:w-fit sm:px-6 sm:py-2 sm:text-base md:px-8 md:text-lg xl:px-10 xl:py-3"
          >
            <span>Review Application</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 text-xs text-textMuted transition-colors duration-200 hover:text-textPrimary sm:w-fit sm:text-sm md:text-base"
          >
            <Home className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
