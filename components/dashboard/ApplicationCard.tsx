import React from "react";
import Link from "next/link";

import { Application } from "@/config/applications";
import { cn } from "@/lib/utils";

interface ApplicationCardProps {
  application: Application;
}

export const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const {
    title,
    status,
    deadline,
    description,
    icon: Icon,
    disabled,
    href,
  } = application;

  return (
    <Link
      href={disabled ? "" : href}
      className={cn(
        "group relative block rounded-lg border border-border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-primaryLight to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
      <h2 className="mb-3 flex items-center text-xl font-semibold text-gray-800 transition-colors group-hover:text-primary dark:text-gray-200 dark:group-hover:text-primaryDark">
        <Icon
          size={24}
          className="mr-3 h-7 w-7 text-primary group-hover:text-primaryDark"
        />
        {title}
      </h2>
      <p className="mb-5 text-sm text-textMuted dark:text-gray-400">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Status:{" "}
          <span
            className={cn(
              "font-semibold capitalize",
              status === "open" && "text-success",
              status === "closed" && "text-error",
              status === "coming soon" && "text-warning",
            )}
          >
            {status}
          </span>
        </span>
        {deadline && (
          <span className="text-sm font-medium text-textMuted dark:text-gray-400">
            Deadline: {deadline}
          </span>
        )}
      </div>
    </Link>
  );
};
