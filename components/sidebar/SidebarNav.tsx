"use client";

import Link from "next/link";
import { ChevronsLeft } from "lucide-react";

import { navigation } from "@/config/navigation";

import SidebarNavLink from "./SidebarNavLink";

type SidebarNavProps = {
  setIsOpen?: (open: boolean) => void;
};

const SidebarNav = ({ setIsOpen }: SidebarNavProps) => {
  return (
    <nav className="flex flex-col gap-4">
      {navigation.map((item) => (
        <SidebarNavLink key={item.href} {...item} setIsOpen={setIsOpen} />
      ))}
    </nav>
  );
};

export default SidebarNav;
