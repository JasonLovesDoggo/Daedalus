import { AlertCircle, Angry } from "lucide-react";

import { statusConfig } from "@/config/status";

import CancelRSVP from "../CancelRSVP";
import { StatusActions } from "./StatusActions";
import { StatusContent } from "./StatusContent";

interface AcceptedContentProps {
  role: UserRole;
}

export const AcceptedContent = ({ role }: AcceptedContentProps) => {
  const config = statusConfig.accepted;

  if (role === "hacker") {
    const { heading, description, primaryAction } = config.hacker;
    return (
      <StatusContent
        status="accepted"
        heading={heading}
        description={description}
        customLabel="Accepted"
        actions={
          <StatusActions primaryAction={primaryAction} className="mb-4" />
        }
      >
        <hr className="mb-2.5" />
        <CancelRSVP />
      </StatusContent>
    );
  }

  const { heading, description, primaryAction, secondaryAction } =
    config.default;
  return (
    <StatusContent
      status="accepted"
      heading={heading}
      description={description}
      customLabel="Accepted"
      actions={
        <StatusActions
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />
      }
    >
      <hr className="my-4 md:my-6" />
      <p className="flex animate-pulse items-center justify-center gap-2 rounded-md border border-error/50 bg-error/20 px-3 py-2.5 text-center font-semibold text-error max-md:text-sm">
        <Angry size={16} strokeWidth={3} />
        Action Required
        <Angry size={16} strokeWidth={3} />
      </p>
    </StatusContent>
  );
};
