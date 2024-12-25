interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const firstName = userName?.split(" ")[0] || "User";

  return (
    <div className="space-y-3 overflow-hidden">
      <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
        <h1 className="text-3xl font-black md:text-4xl xl:text-5xl">
          Hello, {firstName}.
        </h1>
      </div>
      <p className="text-lg font-light text-gray-500 md:text-xl">
        Welcome back!
      </p>
    </div>
  );
};
