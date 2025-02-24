import { cn } from "@/lib/utils";

import PageWrapper from "../PageWrapper";
import { BackButton } from "../ui/back-button";
import { ContactSection } from "./ContactSection";
import { CountdownSection } from "./CountdownSection";
import { DashboardHeader } from "./DashboardHeader";
import DashboardQRCode from "./DashboardQRCode";
import HackathonsCanadaDiscord from "./HackathonsCanadaDiscord";
import ProfileCard from "./ProfileCard";
import ProjectsCard from "./ProjectsCard";

interface DashboardContentProps {
  user: User;
}

export const DashboardContent = ({ user }: DashboardContentProps) => {
  // Lock everything for unassigned users
  const isLocked = user.role === "unassigned";

  return (
    <PageWrapper className="max-w-screen-xl 2xl:max-w-screen-xl">
      <DashboardHeader userName={user.name || "Hacker"} />
      <div
        className={cn("flex flex-col gap-6 md:gap-8 lg:gap-10", {
          "flex-col-reverse": user.role === "hacker",
        })}
      >
        {/* Application Status commented out post-hackathon */}
        {/* <ApplicationStatus status={user.status} role={user.role} /> */}

        <div className="relative w-full rounded-md border-2 border-primary/25 p-6 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-primary/20 before:via-info/30 before:to-primaryLight/30 before:opacity-75 md:p-8 xl:p-12">
          <h2 className="mb-4 text-2xl font-medium text-textPrimary">
            Hack Canada 2025 Has Concluded
          </h2>
          <p className="text-textPrimary/70">
            {user.role === "hacker" &&
              "Thank you for participating in Hack Canada 2025! Your projects and enthusiasm made this event truly special. We hope you gained valuable experience, made lasting connections, and will join us again for Hack Canada 2026!"}
            {(user.role === "organizer" || user.role === "admin") &&
              "Congratulations on successfully organizing Hack Canada 2025! Your hard work and dedication made this event possible. Time to start planning for an even bigger and better Hack Canada 2026!"}
            {user.role === "volunteer" &&
              "Thank you for volunteering at Hack Canada 2025! Your dedication and hard work helped make this event run smoothly. We truly appreciate your contribution and hope you'll be part of our team again next year!"}
            {user.role === "unassigned" &&
              "Thank you for your interest in Hack Canada 2025! While this year's event has concluded, we encourage you to stay tuned for updates about Hack Canada 2026. We'd love to have you join us next year!"}
          </p>
        </div>

        {/* Main Grid Sections */}
        <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-4 lg:gap-10">
          <HackathonsCanadaDiscord />
          <ProjectsCard />
        </div>

        {/* Profile Section */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-5 lg:gap-10">
          <DashboardQRCode isLocked={isLocked} userId={user.id!} />

          {/* Locked for anyone without an assigned role */}
          <ProfileCard isLocked={isLocked} userId={user.id!} />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10">
        <CountdownSection />
        <ContactSection />
      </div>
      <BackButton label="Back to landing page" href="https://hackcanada.org" />
    </PageWrapper>
  );
};
