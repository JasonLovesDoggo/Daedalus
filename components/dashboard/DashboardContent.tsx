import { User } from "next-auth";

import { ApplicationStatus } from "./ApplicationStatus";
import { ContactSection } from "./ContactSection";
import { CountdownSection } from "./CountdownSection";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardContentProps {
  user: User;
}

export const DashboardContent = ({ user }: DashboardContentProps) => {
  return (
    <div className="mx-auto h-full w-full max-w-screen-lg space-y-6 px-4 py-8 md:space-y-8 md:px-8 md:py-12 lg:space-y-10 lg:px-12 lg:py-20 xl:space-y-12 xl:px-16 xl:py-28 2xl:py-32 min-[1850px]:max-w-screen-xl">
      <DashboardHeader userName={user.name || ""} />
      <ApplicationStatus />

      <div className="grid w-full grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3 lg:gap-10 xl:gap-12">
        <CountdownSection />
        <ContactSection />
      </div>
    </div>
  );
};
