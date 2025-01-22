import PageWrapper from "../PageWrapper";
import { BackButton } from "../ui/back-button";
import { ApplicationStatus } from "./ApplicationStatus";
import { ContactSection } from "./ContactSection";
import { CountdownSection } from "./CountdownSection";
import { DashboardHeader } from "./DashboardHeader";
import DiscordInviteCard from "./DiscordInviteCard";
import HackerPackageCard from "./HackerPackageCard";

interface DashboardContentProps {
  user: User;
}

export const DashboardContent = ({ user }: DashboardContentProps) => {
  return (
    <PageWrapper>
      <DashboardHeader userName={user.name || "Hacker"} />
      <ApplicationStatus status={user.status} role={user.role} />

      {user.role !== "hacker" && (
        <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          <DiscordInviteCard />
          <HackerPackageCard />
        </div>
      )}

      <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
        <CountdownSection />
        <ContactSection />
      </div>
      <BackButton label="Back to landing page" href="https://hackcanada.org" />
    </PageWrapper>
  );
};
