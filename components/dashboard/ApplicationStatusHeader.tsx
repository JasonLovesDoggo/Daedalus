type Props = {
  heading: string;
  status: ApplicationStatus | "coming_soon";
};

const statusGradients = {
  not_applied: "from-primary via-sky-500 to-primary",
  pending: "from-primary via-sky-500 to-primary",
  accepted: "from-primary via-sky-400 to-primary",
  rejected: "from-red-400 via-red-500 to-red-400",
  waitlisted: "from-secondary/80 via-amber-400 to-secondary",
  coming_soon: "from-primary via-sky-500 to-primary",
  cancelled: "from-red-400 via-red-500 to-red-400",
};

const ApplicationStatusHeader = ({ heading, status }: Props) => {
  return (
    <div
      className={`w-fit bg-gradient-to-r ${statusGradients[status]} bg-clip-text text-transparent`}
    >
      <h1 className="text-2xl font-semibold md:text-3xl">{heading}</h1>
    </div>
  );
};

export default ApplicationStatusHeader;
