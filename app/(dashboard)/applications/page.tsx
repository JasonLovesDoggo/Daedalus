import { applications } from "@/config/applications";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";

const ApplicationPage = () => {
  return (
    <div className="mx-auto h-full w-full max-w-screen-lg space-y-6 px-4 py-8 md:space-y-8 md:px-8 md:py-12 lg:space-y-10 lg:px-12 lg:py-20 xl:space-y-12 xl:px-16 xl:py-28 2xl:py-32 min-[1850px]:max-w-screen-xl">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold">Manage Your Applications</h1>
        <p className="text-sm text-textMuted">
          Explore application details and stay updated on deadlines.
        </p>
      </div>
      <div className="flex w-full flex-col gap-6">
        {applications.map((application) => (
          <ApplicationCard key={application.title} application={application} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationPage;
