import Sidebar from "@/components/sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex-1">
      {/* Uncomment if a navbar is needed */}
      {/* <nav className="fixed inset-x-0 top-0 z-30 flex h-20 items-center justify-center border-b-2">
        Navbar
      </nav> */}
      <Sidebar />
      <main className="h-full lg:ml-72">{children}</main>
    </div>
  );
};

export default DashboardLayout;
