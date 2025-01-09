import { BackButton } from "@/components/ui/back-button";
import Sidebar from "@/components/sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex-1">
      <Sidebar />
      <main className="h-full lg:ml-72">
        {/* <div className="absolute left-4 top-4">
          <BackButton />
        </div> */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
