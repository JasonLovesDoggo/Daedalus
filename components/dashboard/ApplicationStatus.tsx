import Link from "next/link";
import {
  Clock,
  Frown,
  Hourglass,
  Laugh,
  Loader,
  NotebookPen,
  Smile,
} from "lucide-react";

import { buttonVariants } from "../ui/button";
import ApplicationStatusHeader from "./ApplicationStatusHeader";

const statusStyles = {
  not_applied: "bg-backgroundMuted text-textMuted",
  pending: "bg-backgroundMuted text-secondaryDark",
  accepted: "bg-green-50/25 text-success border-success/50 shadow-success/10",
  rejected: "bg-error/5 text-error border-error/50 shadow-error/10",
  waitlisted: "bg-warning/5 text-warning border-warning/50 shadow-warning/10",
  coming_soon: "bg-backgroundMuted text-textMuted border-primary/50",
};

const statusIcons = {
  not_applied: NotebookPen,
  pending: Smile,
  accepted: Laugh,
  rejected: Frown,
  waitlisted: Hourglass,
  coming_soon: Loader,
};

export const ApplicationStatus = ({
  status,
}: {
  status: ApplicationStatus | "coming_soon";
}) => {
  const Icon = statusIcons[status];

  const renderContent = () => {
    switch (status) {
      case "coming_soon":
        return (
          <>
            <ApplicationStatusHeader
              heading="Applications Coming Soon"
              status={status}
            />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              This feature is not available yet, but it's on the way! Stay tuned
              for updates.
            </p>
            <Link
              href="/applications"
              className={buttonVariants({
                variant: "primary",
                size: "sm",
                className: "w-fit max-xs:w-full",
              })}
            >
              View All Applications
            </Link>
          </>
        );
      case "not_applied":
        return (
          <>
            <ApplicationStatusHeader
              heading="Application not submitted"
              status={status}
            />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              You haven't started an application yet. Click below to begin your
              hackathon journey!
            </p>
            <Link
              href="/applications"
              className={buttonVariants({
                variant: "primary",
                size: "sm",
                className: "w-fit max-xs:w-full",
              })}
            >
              Start Application
            </Link>
          </>
        );
      case "pending":
        return (
          <>
            <ApplicationStatusHeader
              heading="Application submitted"
              status={status}
            />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              Your application is currently being reviewed by our team. We will
              notify you as soon as there's an update.
            </p>
            <Link
              href="/applications/hacker/review"
              className={buttonVariants({
                variant: "primary",
                size: "sm",
                className: "w-fit max-xs:w-full",
              })}
            >
              Review Application
            </Link>
          </>
        );
      case "accepted":
        return (
          <>
            <ApplicationStatusHeader
              heading="Congratulations!"
              status={status}
            />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              You've been accepted to the hackathon! We're excited to have you
              join us. Click below to view your application details and next
              steps.
            </p>
            <Link
              href="/applications"
              className={buttonVariants({
                variant: "primary",
                size: "sm",
                className: "w-fit max-xs:w-full",
              })}
            >
              View Details
            </Link>
          </>
        );
      case "rejected":
        return (
          <>
            <ApplicationStatusHeader
              heading="You weren't accepted"
              status={status}
            />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              Thank you for applying to our hackathon. While we couldn't accept
              your application this time, we hope to see you at future events!
            </p>
            <Link
              href="/applications/hacker/review"
              className={buttonVariants({
                variant: "destructive",
                size: "sm",
                className: "w-fit max-xs:w-full",
              })}
            >
              Review Application
            </Link>
          </>
        );
      case "waitlisted":
        return (
          <>
            <ApplicationStatusHeader
              heading="You're on the waitlist"
              status={status}
            />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              You're currently on the waitlist for this hackathon. We'll notify
              you if a spot becomes available.
            </p>
            <Link
              href="/applications/hacker/review"
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
                className: "w-fit max-xs:w-full",
              })}
            >
              Review Application
            </Link>
          </>
        );
    }
  };

  return (
    <div
      className={`relative w-full rounded-md border border-gray-300 p-6 shadow-md md:p-8 xl:p-12 ${statusStyles[status]}`}
    >
      <Icon className="absolute left-1 top-1 text-muted-foreground opacity-50 md:left-2 md:top-2 md:size-8" />
      <div className="flex flex-col gap-1">{renderContent()}</div>
    </div>
  );
};
