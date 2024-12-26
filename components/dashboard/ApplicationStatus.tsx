import { Clock, Frown, Hourglass, Loader, Pencil, Smile } from "lucide-react";

import ApplicationStatusHeader from "./ApplicationStatusHeader";

const statusStyles = {
  not_applied: "bg-backgroundMuted text-textMuted",
  pending: "bg-backgroundMuted text-secondaryDark",
  accepted: "bg-success/10 text-success",
  rejected: "bg-error/10 text-error",
  waitlisted: "bg-warning/10 text-warning",
  coming_soon: "bg-backgroundMuted text-textMuted",
};

const statusIcons = {
  not_applied: Pencil,
  pending: Clock,
  accepted: Smile,
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
            <p className="text-muted-foreground">
              This feature is not available yet, but it's on the way! Stay tuned
              for updates.
            </p>
          </>
        );
      case "not_applied":
        return (
          <>
            <ApplicationStatusHeader
              heading="No application yet"
              status={status}
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Click below to get started
            </p>
          </>
        );
      case "pending":
        return (
          <>
            <ApplicationStatusHeader
              heading="Application in review"
              status={status}
            />
            <p className="mt-1 text-sm text-muted-foreground">
              We'll notify you when there's an update
            </p>
          </>
        );
      case "accepted":
        return (
          <>
            <ApplicationStatusHeader
              heading="Congratulations!"
              status={status}
            />
            <p className="mt-1 text-sm text-muted-foreground">
              You've been accepted to the hackathon
            </p>
          </>
        );
      case "rejected":
        return (
          <>
            <ApplicationStatusHeader
              heading="Application not accepted"
              status={status}
            />
            <p className="mt-1 text-sm text-muted-foreground">
              Thank you for applying. We hope to see you at future events
            </p>
          </>
        );
      case "waitlisted":
        return (
          <>
            <ApplicationStatusHeader
              heading="You're on the waitlist"
              status={status}
            />
            <p className="mt-1 text-sm text-muted-foreground">
              We'll notify you if a spot becomes available
            </p>
          </>
        );
    }
  };

  return (
    <div
      className={`relative w-full rounded-sm border border-gray-300 p-4 md:p-8 xl:p-12 ${statusStyles[status]}`}
    >
      <Icon className="absolute left-2 top-2 size-8 text-muted-foreground opacity-50" />
      <div className="flex flex-col gap-1">{renderContent()}</div>
    </div>
  );
};
