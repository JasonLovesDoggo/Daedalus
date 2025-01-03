import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { applications } from "@/config/applications";
import { ApplicationCard } from "@/components/applications/ApplicationCard";

const ApplicationPage = async () => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/login");
  }

  const alreadyApplied = user.status !== "not_applied";

  return (
    <div className="mx-auto h-full w-full max-w-screen-lg space-y-6 px-4 py-8 md:space-y-8 md:px-8 md:py-12 lg:space-y-10 lg:px-12 lg:py-20 xl:space-y-12 xl:px-16 xl:py-28 2xl:py-32 min-[1850px]:max-w-screen-xl">
      <div className="mb-8 space-y-2">
        <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
          <h1 className="font-rubik text-3xl font-bold">
            Manage Your Applications
          </h1>
        </div>
        <p className="text-textMuted max-md:text-sm">
          Explore application details and stay updated on deadlines.
        </p>
      </div>
      <div className="flex w-full flex-col gap-6">
        {applications.map((application) => (
          <ApplicationCard
            key={application.title}
            application={application}
            alreadyApplied={
              alreadyApplied && application.title === "Hacker Applications"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ApplicationPage;
