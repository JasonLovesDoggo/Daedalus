"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";

import SidebarLogo from "./sidebar/SidebarLogo";
import SidebarNav from "./sidebar/SidebarNav";
import SidebarUser from "./sidebar/SidebarUser";
import { Button } from "./ui/button";

type Props = {};

const Navbar = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-40 flex h-16 w-full items-center bg-background px-4 shadow-md sm:px-6 md:px-8 lg:hidden">
        <div className="flex w-full items-center justify-between gap-4">
          <SidebarLogo className="h-8 w-auto" />

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={isOpen ? "bg-primary/10 text-primary" : ""}
          >
            <Menu className="size-6" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`fixed inset-y-0 right-0 z-40 flex w-72 flex-col overflow-y-auto bg-background shadow-lg shadow-black/25 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-16 mt-24 flex h-full w-full flex-col space-y-24 px-10">
            <SidebarNav />
            <SidebarUser />
          </div>

          <Image
            src="/sidebar-waves.svg"
            alt="Sidebar waves"
            priority
            width={1}
            height={1}
            className="pointer-events-none absolute bottom-0 left-0 w-full select-none object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
