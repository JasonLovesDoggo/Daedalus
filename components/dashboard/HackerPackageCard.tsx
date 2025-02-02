import { Download, ExternalLink } from "lucide-react";

import { discordInviteUrl } from "@/config/site";

import { buttonVariants } from "../ui/button";
import CardDecorativeElements from "./CardDecorativeElements";
import LockedState from "./LockedState";

interface HackerPackageCardProps {
  isLocked: boolean;
  role: UserRole;
}

const HackerPackageCard = ({ isLocked, role }: HackerPackageCardProps) => {
  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div
        className={`group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-md border bg-backgroundMuted p-6 transition hover:border-primaryLight hover:shadow-lg ${isLocked ? "border-gray-200/50" : "border-border"}`}
      >
        {isLocked && (
          <LockedState
            label={role !== "hacker" ? "Hackers Only" : "Coming Soon"}
          />
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            Hacker Package
          </h2>
          <div className="flex size-8 items-center justify-center rounded-full bg-primary/10">
            <Download
              className={`size-5 ${isLocked ? "text-gray-400" : "text-primary"}`}
            />
          </div>
        </div>

        <p className="pb-2 text-textMuted">
          Download your hacker package containing essential information,
          schedule, and resources for Hack Canada 2025.
        </p>

        <div className="mt-auto flex items-center gap-2">
          <a
            href={isLocked ? "" : discordInviteUrl}
            aria-disabled={isLocked}
            className={buttonVariants({
              variant: isLocked ? "outline" : "default",
              className: `inline-flex items-center gap-2 ${isLocked ? "pointer-events-none cursor-not-allowed !text-gray-400 opacity-40 hover:bg-transparent" : ""}`,
            })}
          >
            Get Package
            <ExternalLink className="size-4" />
          </a>
        </div>

        {/* Decorative elements */}
        <CardDecorativeElements isLocked={isLocked} />
      </div>
    </div>
  );
};

export default HackerPackageCard;
