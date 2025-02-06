import Link from "next/link";
import { Pencil } from "lucide-react";
import { User } from "next-auth";

import { buttonVariants } from "@/components/ui/button";

interface ProfileHeaderProps {
  name: string;
  role: string;
  bio?: string | null;
  isOwner: boolean;
}

export function ProfileHeader({
  name,
  role,
  bio,
  isOwner,
}: ProfileHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 via-info/30 to-primaryLight/20 p-6 md:p-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-32 size-64 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-64 rounded-full bg-info/30 blur-3xl" />
      </div>

      {/* Header Content */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="font-rubik text-2xl font-black tracking-wider text-textPrimary md:text-3xl lg:text-4xl">
            {name}
          </h1>
          <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium capitalize text-textPrimary shadow-sm backdrop-blur-[2px]">
            {role}
          </span>
        </div>

        {isOwner && (
          <Link
            title="Edit Profile"
            aria-label="Edit Profile"
            href="/profile/edit"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className:
                "shrink-0 text-textSecondary shadow-sm hover:text-black",
            })}
          >
            <Pencil className="size-4" />
          </Link>
        )}
      </div>

      {/* Bio Section */}
      {bio && (
        <div className="relative rounded-lg bg-white/80 p-4 backdrop-blur-sm">
          <p className="whitespace-pre-wrap text-textSecondary">{bio}</p>
        </div>
      )}
    </div>
  );
}
