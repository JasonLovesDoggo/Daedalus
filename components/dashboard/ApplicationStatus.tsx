export const ApplicationStatus = ({
  status,
}: {
  status: ApplicationStatus;
}) => {
  return (
    <div className="w-full rounded-sm border border-gray-300 p-4 md:p-8 xl:p-12">
      <p className="text-center">{status}</p>
    </div>
  );
};
