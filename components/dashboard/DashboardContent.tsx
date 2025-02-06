import { cn } from "@/lib/utils";

import PageWrapper from "../PageWrapper";
import { BackButton } from "../ui/back-button";
import { ApplicationStatus } from "./ApplicationStatus";
import { ContactSection } from "./ContactSection";
import { CountdownSection } from "./CountdownSection";
import { DashboardHeader } from "./DashboardHeader";
import DiscordInviteCard from "./DiscordInviteCard";
import HackerPackageCard from "./HackerPackageCard";
import ProfileCard from "./ProfileCard";

interface DashboardContentProps {
  user: User;
}

export const DashboardContent = ({ user }: DashboardContentProps) => {
  // TODO: Remove the "true" when we have the links ready
  const isLocked = user.role !== "hacker" || true;

  return (
    <PageWrapper>
      <DashboardHeader userName={user.name || "Hacker"} />
      <div
        className={cn("flex flex-col gap-6 md:gap-8 lg:gap-10 xl:gap-12", {
          "flex-col-reverse": user.role === "hacker",
        })}
      >
        <ApplicationStatus status={user.status} role={user.role} />

        {/* Profile Section */}
        {/* Locked for anyone without an assigned role */}
        <ProfileCard isLocked={user.role === "unassigned"} userId={user.id!} />
      </div>

      {/* Main Grid Sections */}
      <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-4 lg:gap-10 xl:gap-12">
        <DiscordInviteCard isLocked={isLocked} role={user.role} />
        <HackerPackageCard isLocked={isLocked} role={user.role} />
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
        <CountdownSection />
        <ContactSection />
      </div>
      <BackButton label="Back to landing page" href="https://hackcanada.org" />
    </PageWrapper>
  );
};
