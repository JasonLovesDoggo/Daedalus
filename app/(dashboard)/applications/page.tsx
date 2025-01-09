import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/auth";

import { applications } from "@/config/applications";
import { ApplicationCard } from "@/components/applications/ApplicationCard";
import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Applications",
};

const ApplicationPage = async () => {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    redirect("/login");
  }

  const alreadyApplied = user.status !== "not_applied";

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default ApplicationPage;
