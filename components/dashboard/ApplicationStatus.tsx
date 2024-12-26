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
import CancelRSVP from "./CancelRSVP";

const statusStyles = {
  not_applied: "bg-backgroundMuted text-textMuted",
  pending: "bg-backgroundMuted text-secondaryDark",
  accepted: "bg-backgroundMuted shadow-success/10",
  rejected: "bg-error/5 text-error border-error/50 shadow-error/10",
  waitlisted: "bg-warning/5 text-warning border-warning/50 shadow-warning/10",
  coming_soon: "bg-backgroundMuted text-textMuted border-primary/50",
  cancelled: "bg-error/5 text-error border-error/50 shadow-error/10",
};

const statusIcons = {
  not_applied: NotebookPen,
  pending: Smile,
  accepted: Laugh,
  rejected: Frown,
  waitlisted: Hourglass,
  coming_soon: Loader,
  cancelled: Frown,
};

export const ApplicationStatus = ({
  status,
  role,
}: {
  status: ApplicationStatus | "coming_soon";
  role: UserRole;
}) => {
  const Icon = statusIcons[status];

  const renderContent = () => {
    switch (status) {
      case "coming_soon":
        return (
          <>
            <span className="w-fit rounded-sm bg-primaryDark px-1 py-0.5 text-[10px] font-medium text-white md:text-xs">
              Coming Soon
            </span>
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
            <span className="w-fit rounded-sm bg-primaryDark px-1 py-0.5 text-[10px] font-medium text-white md:text-xs">
              Not Applied
            </span>
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
            <span className="w-fit rounded-sm bg-primaryDark px-1 py-0.5 text-[10px] font-medium text-white md:text-xs">
              Applied
            </span>
            <ApplicationStatusHeader
              heading="Application submitted"
              status={status}
            />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              Your application is currently being reviewed by our team. We will
              notify you as soon as there's an update.
            </p>
            <div className="flex gap-2 max-xs:flex-col">
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
              <Link
                href="/applications"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "w-fit max-xs:w-full",
                })}
              >
                View All Applications
              </Link>
            </div>
          </>
        );
      case "accepted":
        if (role === "hacker") {
          return (
            <>
              <span className="w-fit rounded-sm bg-green-400 px-1 py-0.5 text-[10px] font-bold text-black md:text-xs">
                Accepted
              </span>
              <ApplicationStatusHeader heading="You're in!" status={status} />
              <p className="pb-2.5 text-textMuted max-md:text-sm">
                Congrats, you have been accepted! Mark your calendar for
                February 21st, we are super excited to see you!
              </p>
              <Link
                href="/applications/hacker/review"
                className={buttonVariants({
                  variant: "primary",
                  size: "sm",
                  className: "mb-4 w-fit max-xs:w-full",
                })}
              >
                Review Application
              </Link>
              <hr className="mb-2.5" />
              {/* TODO: Cancel RSVP Section */}
              <CancelRSVP />
            </>
          );
        } else {
          return (
            <>
              <div className="flex items-center gap-1">
                <span className="rounded-sm bg-green-400 px-1 py-0.5 text-xs font-bold text-black">
                  Accepted
                </span>
                <span className="animate-pulse text-[10px] font-bold text-error md:text-xs">
                  [Action Required]
                </span>
              </div>
              <ApplicationStatusHeader
                heading="Congratulations!"
                status={status}
              />
              <p className="pb-2.5 text-textMuted max-md:text-sm">
                You've been accepted to the hackathon! Please complete the form
                below within 7 days of your acceptance to secure your spot!
              </p>
              <div className="flex items-center gap-2 max-xs:flex-col">
                <Link
                  href="/applications/hacker/rsvp"
                  className={buttonVariants({
                    variant: "primary",
                    size: "sm",
                    className: "w-fit max-xs:w-full md:text-lg",
                  })}
                >
                  RSVP
                </Link>
                <Link
                  href="/applications/hacker/review"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "w-fit max-xs:w-full",
                  })}
                >
                  Review Application
                </Link>
              </div>
            </>
          );
        }
      case "rejected":
        return (
          <>
            <span className="w-fit rounded-sm bg-error px-1 py-0.5 text-[10px] font-medium text-white md:text-xs">
              Rejected
            </span>
            <ApplicationStatusHeader
              heading="You weren't accepted"
              status={status}
            />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              Thank you for applying to our hackathon. While we couldn't accept
              your application this time, we hope to see you at future events!
            </p>
            <div className="flex gap-2 max-xs:flex-col">
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
              <Link
                href="/applications"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "w-fit max-xs:w-full",
                })}
              >
                View All Applications
              </Link>
            </div>
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
              You're currently on the waitlist for the hackathon. We'll notify
              you if a spot becomes available.
            </p>
            <div className="flex gap-2 max-xs:flex-col">
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
              <Link
                href="/applications"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "w-fit max-xs:w-full",
                })}
              >
                View All Applications
              </Link>
            </div>
          </>
        );
      case "cancelled":
        return (
          <>
            <span className="w-fit rounded-sm bg-error px-1 py-0.5 text-[10px] font-medium text-white md:text-xs">
              Cancelled RSVP
            </span>
            <ApplicationStatusHeader heading="C'mon :((" status={status} />
            <p className="pb-2.5 text-textMuted max-md:text-sm">
              You've cancelled your RSVP for the hackathon. We hope to see you
              next year!
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
      <Icon className="absolute right-1 top-1 text-muted-foreground opacity-50 md:right-2 md:top-2 md:size-8" />
      <div className="flex flex-col gap-1">{renderContent()}</div>
    </div>
  );
};
