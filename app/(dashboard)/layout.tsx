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
      <div className="fixed inset-y-0 z-30 hidden w-72 border-r bg-background lg:flex">
        Sidebar
      </div>
      <main className="h-svh lg:ml-72">{children}</main>
    </div>
  );
};

export default DashboardLayout;
