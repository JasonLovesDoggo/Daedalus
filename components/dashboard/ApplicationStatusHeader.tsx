type Props = {
  heading: string;
  status: ApplicationStatus | "coming_soon";
};

const statusGradients = {
  not_applied: "from-gray-400 via-gray-500 to-gray-400",
  pending: "from-blue-400 via-blue-500 to-blue-400",
  accepted: "from-green-400 via-green-500 to-green-400",
  rejected: "from-red-400 via-red-500 to-red-400",
  waitlisted: "from-yellow-400 via-yellow-500 to-yellow-400",
  coming_soon: "from-gray-400 via-gray-500 to-gray-400",
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
