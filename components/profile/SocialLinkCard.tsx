import Image from "next/image";
import {
  CloudSnow,
  Compass,
  Flame,
  Github,
  Instagram,
  LinkedinIcon,
  Mountain,
  Radio,
  Share2,
  Snowflake,
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
  github: "from-gray-800/40 to-gray-600/40",
  linkedin: "from-blue-600/40 to-blue-400/40",
  instagram: "from-pink-600/40 via-purple-600/40 to-blue-600/40",
  youtube: "from-red-600/40 to-red-400/40",
  twitch: "from-purple-600/40 to-purple-400/40",
  portfolio: "from-orange-500/40 to-yellow-400/40",
};

const platformStyles: Record<Platform, string> = {
  github: "hover:text-gray-900 group-hover/card:shadow-gray-500/20",
  linkedin: "hover:text-blue-600 group-hover/card:shadow-blue-500/20",
  instagram: "hover:text-pink-600 group-hover/card:shadow-pink-500/20",
  youtube: "hover:text-red-600 group-hover/card:shadow-red-500/20",
  twitch: "hover:text-purple-600 group-hover/card:shadow-purple-500/20",
  portfolio: "hover:text-orange-500 group-hover/card:shadow-orange-500/20",
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
      className="group relative overflow-hidden rounded-lg border-2 border-primary/20 bg-white/50 p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-lg"
      role="region"
      aria-label="Social Media Links"
    >
      {/* Enhanced layered background effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-info/30 via-primaryLight/30 to-primary/30 opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />

        {/* Mesh gradient pattern */}
        <div className="absolute inset-0 opacity-0 mix-blend-normal transition-all duration-700 group-hover:opacity-80">
          <div className="absolute inset-0 bg-[radial-gradient(at_70%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(at_30%_80%,rgba(59,130,246,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_80%_50%,rgba(59,130,246,0.25),transparent_25%)]" />
        </div>

        {/* Noise texture */}
        {/* <div className="absolute inset-0 bg-[url('/grainy-texture.jpg')] opacity-0 mix-blend-soft-light transition-all duration-700 group-hover:opacity-20" /> */}
        <div className="absolute inset-0 opacity-5 mix-blend-soft-light transition group-hover:opacity-20">
          <Image
            src="/grainy-texture.jpg"
            alt="Grainy texture"
            fill
            sizes="100px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Large winter-themed decorative icons */}
        <CloudSnow className="absolute -right-16 -top-16 size-40 rotate-12 text-[#f0f4ff] transition-all duration-700 group-hover:rotate-[30deg] group-hover:scale-110 group-hover:text-[#e5e9ff]" />
        <Share2 className="absolute -bottom-12 -left-12 size-32 -rotate-12 text-[#f0f4ff] transition-all duration-700 group-hover:-rotate-[30deg] group-hover:scale-110 group-hover:text-[#e5e9ff]" />

        {/* Additional floating elements */}
        <div className="absolute left-1/4 top-0 h-20 w-20 rounded-full bg-info/5 blur-xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-75" />
        <div className="absolute bottom-1/4 right-0 h-24 w-24 rounded-full bg-primary/5 blur-xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-75" />
      </div>

      {/* Enhanced header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-full bg-gradient-to-br from-primary/10 to-info/10 p-2">
          <Snowflake
            strokeWidth={2.5}
            className="size-5 text-primary transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110"
          />
        </div>
        <h2 className="text-2xl font-semibold tracking-wide text-textPrimary">
          Connect With Me
        </h2>
      </div>

      {/* Enhanced grid of social links */}
      <div className="grid auto-rows-fr grid-cols-2 gap-5 sm:grid-cols-3">
        {integrations.map((integration, index) => (
          <a
            key={integration.platform}
            href={integration.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/card flex flex-col items-center gap-4 rounded-xl border-2 border-white/25 bg-white/50 p-5 hover:border-white/75",
              "text-textSecondary shadow-md backdrop-blur-md",
              "transition-all duration-500 hover:-translate-y-1 hover:shadow-lg",
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
                "relative flex size-16 items-center justify-center overflow-hidden rounded-xl md:size-20 lg:size-24",
                "bg-gradient-to-br p-4",
                platformGradients[integration.platform],
                "transition-all duration-500 group-hover/card:scale-110 group-hover/card:shadow-md",
              )}
            >
              {/* Animated background effects */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100">
                <div className="absolute inset-0 animate-[spin_4s_linear_infinite] opacity-50">
                  <div className="absolute inset-0 rotate-45 transform-gpu bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
                <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
              </div>

              {/* Platform icon wrapper */}
              <div className="relative z-10">
                {platformIcons[integration.platform]}
              </div>
            </div>
            <span className="text-sm font-medium capitalize tracking-wide md:text-base lg:text-lg">
              {integration.platform}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
