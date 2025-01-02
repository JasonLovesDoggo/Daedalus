import { ApplicationStatus } from "./ApplicationStatus";
import { ContactSection } from "./ContactSection";
import { CountdownSection } from "./CountdownSection";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardContentProps {
  user: User;
}

export const DashboardContent = ({ user }: DashboardContentProps) => {
  console.log("user", user);

  return (
    <div className="mx-auto h-full w-full max-w-screen-lg space-y-4 px-4 py-8 md:space-y-6 md:px-8 md:py-12 lg:space-y-8 lg:px-12 lg:py-20 xl:space-y-10 xl:px-16 xl:py-28 2xl:py-32 min-[1850px]:max-w-screen-xl">
      <DashboardHeader userName={user.name || ""} />
      <ApplicationStatus status={user.status} role={user.role} />

      <div className="grid w-full grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
        <CountdownSection />
        <ContactSection />
      </div>
    </div>
  );
};
