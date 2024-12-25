import SidebarLogo from "./SidebarLogo";
import SidebarNav from "./SidebarNav";
import SidebarUser from "./SidebarUser";

type Props = {};

const Sidebar = ({}: Props) => {
  return (
    <div className="fixed inset-y-0 z-30 flex w-72 flex-col overflow-y-auto border-r bg-background max-lg:hidden">
      <div className="mb-16 mt-24 flex h-full w-full flex-col space-y-24 px-10">
        <SidebarLogo />
        <SidebarNav />
        <SidebarUser />
      </div>
    </div>
  );
};

export default Sidebar;
