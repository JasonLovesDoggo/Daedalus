import {
  Flame,
  Github,
  Instagram,
  LinkedinIcon,
  Radio,
  Share2,
  Youtube,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Platform } from "@/lib/validations/profile";

const platformIcons: Record<Platform, React.ReactNode> = {
  github: (
    <Github className="size-7 transition-all duration-300 group-hover/card:rotate-[20deg] group-hover/card:scale-110" />
  ),
  linkedin: (
    <LinkedinIcon className="size-7 transition-all duration-300 group-hover/card:-rotate-12 group-hover/card:scale-125" />
  ),
  instagram: (
    <Instagram className="size-7 transition-all duration-300 group-hover/card:rotate-[45deg] group-hover/card:scale-110" />
  ),
  youtube: (
    <Youtube className="size-7 transition-all duration-300 group-hover/card:scale-125 group-hover/card:text-red-500" />
  ),
  twitch: (
    <Radio className="size-7 transition-all duration-300 group-hover/card:rotate-[360deg] group-hover/card:scale-110" />
  ),
  portfolio: (
    <Flame className="size-7 transition-all duration-300 group-hover/card:rotate-[-12deg] group-hover/card:scale-125 group-hover/card:text-orange-500" />
  ),
};

const platformGradients: Record<Platform, string> = {
  github: "from-gray-800/20 to-gray-600/20",
  linkedin: "from-blue-600/20 to-blue-400/20",
  instagram: "from-pink-600/20 via-purple-600/20 to-blue-600/20",
  youtube: "from-red-600/20 to-red-400/20",
  twitch: "from-purple-600/20 to-purple-400/20",
  portfolio: "from-orange-500/20 to-yellow-400/20",
};

const platformStyles: Record<Platform, string> = {
  github:
    "hover:text-gray-900 hover:dark:text-gray-100 group-hover/card:shadow-gray-500/20",
  linkedin:
    "hover:text-blue-600 hover:dark:text-blue-400 group-hover/card:shadow-blue-500/20",
  instagram:
    "hover:text-pink-600 hover:dark:text-pink-400 group-hover/card:shadow-pink-500/20",
  youtube:
    "hover:text-red-600 hover:dark:text-red-400 group-hover/card:shadow-red-500/20",
  twitch:
    "hover:text-purple-600 hover:dark:text-purple-400 group-hover/card:shadow-purple-500/20",
  portfolio:
    "hover:text-orange-500 hover:dark:text-orange-400 group-hover/card:shadow-orange-500/20",
};

interface Integration {
  platform: Platform;
  url: string;
}

interface SocialLinkCardProps {
  integrations: Integration[];
}

export function SocialLinkCard({ integrations }: SocialLinkCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-lg border-2 border-primary/20 bg-white/50 p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-lg dark:bg-black/20"
      role="region"
      aria-label="Social Media Links"
    >
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] opacity-0 transition-all duration-700 group-hover:opacity-100" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-info/5 via-primaryLight/5 to-primary/5 opacity-0 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />

      {/* Enhanced decorative icons */}
      <Share2 className="absolute -right-16 -top-16 h-40 w-40 rotate-12 text-primary/5 transition-all duration-700 group-hover:rotate-[30deg] group-hover:scale-110 group-hover:text-primary/10" />
      <Share2 className="absolute -bottom-12 -left-12 h-32 w-32 -rotate-12 text-primary/5 transition-all duration-700 group-hover:-rotate-[30deg] group-hover:scale-110 group-hover:text-primary/10" />

      {/* Enhanced header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-full bg-gradient-to-br from-primary/10 to-info/10 p-2">
          <Share2
            strokeWidth={2.5}
            className="size-5 text-primary transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
          />
        </div>
        <h2 className="text-2xl font-semibold tracking-wide text-textPrimary">
          Connect With Me
        </h2>
      </div>

      {/* Enhanced grid of social links */}
      <div className="grid auto-rows-fr grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
        {integrations.map((integration, index) => (
          <a
            key={integration.platform}
            href={integration.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/card flex flex-col items-center gap-4 rounded-xl bg-white/80 p-5",
              "text-textSecondary shadow-md backdrop-blur-sm",
              "transition-all duration-500 hover:-translate-y-1 hover:shadow-lg",
              "dark:bg-black/40 dark:hover:bg-black/30",
              "animate-fadeIn",
              platformStyles[integration.platform],
            )}
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "backwards",
            }}
            aria-label={`Connect on ${integration.platform}`}
          >
            <div
              className={cn(
                "flex size-16 items-center justify-center rounded-xl",
                "bg-gradient-to-br p-4",
                platformGradients[integration.platform],
                "transition-all duration-500 group-hover/card:scale-110 group-hover/card:shadow-md",
              )}
            >
              {platformIcons[integration.platform]}
            </div>
            <span className="text-sm font-medium capitalize tracking-wide">
              {integration.platform}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
