"use client";

import { navigation } from "@/config/navigation";

import SidebarNavLink from "./SidebarNavLink";

const SidebarNav = () => {
  return (
    <nav className="flex flex-col gap-4">
      {navigation.map((item) => (
        <SidebarNavLink key={item.href} {...item} />
      ))}
    </nav>
  );
};

export default SidebarNav;
