import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-lg space-y-4 px-4 py-8 md:space-y-6 md:px-8 md:py-12 lg:space-y-8 lg:px-12 lg:py-20 xl:space-y-10 xl:px-16 xl:py-28 2xl:py-32 min-[1850px]:max-w-screen-xl",
        className,
      )}
    >
      {children}
    </div>
  );
};
export default PageWrapper;
