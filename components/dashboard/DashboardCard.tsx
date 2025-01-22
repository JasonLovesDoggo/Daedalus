import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const DashboardCard = ({ children, className }: Props) => {
  return (
    <div className={cn("rounded-md border p-4 md:p-8 xl:p-12", className)}>
      {children}
    </div>
  );
};
export default DashboardCard;
