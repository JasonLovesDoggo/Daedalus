import { statusIcons, statusStyles } from "@/config/status";

import { AcceptedContent } from "./status/AcceptedContent";
import {
  CancelledContent,
  ComingSoonContent,
  NotAppliedContent,
  PendingContent,
  RejectedContent,
  WaitlistedContent,
} from "./status/StatusContent";

interface ApplicationStatusProps {
  status: ApplicationStatus | "coming_soon";
  role: UserRole;
}

export const ApplicationStatus = ({ status, role }: ApplicationStatusProps) => {
  const Icon = statusIcons[status];

  const renderContent = () => {
    switch (status) {
      case "coming_soon":
        return <ComingSoonContent />;
      case "not_applied":
        return <NotAppliedContent />;
      case "pending":
        return <PendingContent />;
      case "accepted":
        return <AcceptedContent role={role} />;
      case "rejected":
        return <RejectedContent />;
      case "waitlisted":
        return <WaitlistedContent />;
      case "cancelled":
        return <CancelledContent />;
    }
  };

  return (
    <div
      className={`relative w-full rounded-md border border-gray-300 p-6 shadow-md md:p-8 xl:p-12 ${statusStyles[status]}`}
    >
      <Icon className="absolute right-1 top-1 text-muted-foreground opacity-50 md:right-2 md:top-2 md:size-8" />
      <div className="flex flex-col">{renderContent()}</div>
    </div>
  );
};
