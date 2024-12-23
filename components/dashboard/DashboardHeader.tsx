interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const firstName = userName?.split(" ")[0] || "User";

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-black md:text-4xl xl:text-5xl">
        Hello, {firstName}.
      </h1>
      <p className="text-lg font-light text-gray-500 md:text-xl xl:text-2xl">
        Welcome back!
      </p>
    </div>
  );
};