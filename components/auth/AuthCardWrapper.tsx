import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const AuthCardWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "w-full space-y-4 rounded-sm border border-white/50 bg-gradient-to-b from-white/25 to-[#0A1F44]/10 p-4 shadow-md backdrop-blur-sm md:space-y-6 md:p-8 xl:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
};
export default AuthCardWrapper;
