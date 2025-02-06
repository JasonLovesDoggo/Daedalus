import Link from "next/link";
import { User } from "lucide-react";

import { buttonVariants } from "../ui/button";
import CardDecorativeElements from "./CardDecorativeElements";
import LockedState from "./LockedState";

interface ProfileCardProps {
  isLocked: boolean;
  userId: string;
}

const ProfileCard = ({ isLocked, userId }: ProfileCardProps) => {
  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div
        className={`group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-md border bg-backgroundMuted p-6 transition hover:border-primaryLight hover:shadow-lg ${
          isLocked ? "border-gray-200/50" : "border-border"
        }`}
      >
        {isLocked && <LockedState label="Coming Soon" />}

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            Your Profile
          </h2>
          <div
            className={`rounded-lg p-2 ${
              isLocked ? "text-gray-400" : "text-primary"
            }`}
          >
            <User className="size-8" />
          </div>
        </div>

        <p className="pb-2 text-textMuted">
          Customize your public profile, share your interests, and connect with
          others through your unique QR code-enabled profile page.
        </p>

        <div className="mt-auto flex items-center gap-2">
          <Link
            href={isLocked ? "" : `/profile/${userId}`}
            aria-disabled={isLocked}
            className={buttonVariants({
              variant: isLocked ? "outline" : "primary",
              className: `inline-flex items-center gap-2 ${
                isLocked
                  ? "pointer-events-none cursor-not-allowed !text-gray-400 opacity-40 hover:bg-transparent"
                  : ""
              }`,
            })}
          >
            Manage Profile
            <User className="size-4" />
          </Link>
        </div>

        <CardDecorativeElements isLocked={isLocked} />
      </div>
    </div>
  );
};

export default ProfileCard;
