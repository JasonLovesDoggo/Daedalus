import React from "react";
import Link from "next/link";

import { Application } from "@/config/applications";
import { cn } from "@/lib/utils";

import { ApplicationCardHeader } from "./ApplicationCardHeader";
import { ApplicationCardStatus } from "./ApplicationCardStatus";

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
      <ApplicationCardHeader
        title={title}
        description={description}
        icon={Icon}
      />

      <ApplicationCardStatus status={status} deadline={deadline} />
    </Link>
  );
};
