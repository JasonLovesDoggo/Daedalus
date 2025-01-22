import { ExternalLink } from "lucide-react";

import { buttonVariants } from "../ui/button";
import LockedState from "./LockedState";

interface DiscordInviteCardProps {
  isLocked: boolean;
}

const DiscordInviteCard = ({ isLocked }: DiscordInviteCardProps) => {
  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div
        className={`group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-md border bg-backgroundMuted p-6 transition hover:border-primaryLight hover:shadow-lg ${isLocked ? "border-gray-200/50" : "border-border"}`}
      >
        {isLocked && <LockedState />}

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            Discord Community
          </h2>
          {/* Discord SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 127.14 96.36"
            className={`${isLocked ? "fill-gray-400" : "fill-[#5865F2]"}`}
          >
            <g>
              <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
            </g>
          </svg>
        </div>

        <p className="pb-2 text-textMuted">
          Join our Discord server to connect with fellow hackers, get important
          updates, and participate in our vibrant community!
        </p>

        <div className="mt-auto flex items-center gap-2">
          <button
            disabled={isLocked}
            className={buttonVariants({
              variant: isLocked ? "outline" : "default",
              className: `inline-flex items-center gap-2 ${isLocked ? "cursor-not-allowed !text-gray-400 opacity-40 hover:bg-transparent" : ""}`,
            })}
          >
            Join Server
            <ExternalLink className="size-4" />
          </button>
        </div>

        {/* Decorative background elements */}
        <div
          className={`ease-[cubic-bezier(0.25,0.1,0.25,1)] absolute -right-16 -top-16 h-32 w-32 rotate-12 rounded-lg ${isLocked ? "bg-gray-200/10" : "bg-primaryLight/10"} transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:opacity-80`}
        />
        <div
          className={`ease-[cubic-bezier(0.25,0.1,0.25,1)] absolute -right-8 -top-8 h-24 w-24 rotate-12 rounded-lg ${isLocked ? "bg-gray-200/5" : "bg-primaryLight/5"} transition-all duration-500 group-hover:translate-y-1 group-hover:scale-110 group-hover:opacity-80`}
        />
      </div>
    </div>
  );
};

export default DiscordInviteCard;
