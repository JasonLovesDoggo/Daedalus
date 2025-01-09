"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import MobileMenu from "./MobileMenu";
import SidebarLogo from "./sidebar/SidebarLogo";
import { Button } from "./ui/button";

type Props = {};

const Navbar = ({}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 z-40 flex h-16 w-full items-center bg-background px-4 shadow-md sm:px-6 md:px-8 lg:hidden">
        <div className="flex w-full items-center justify-between gap-4">
          <SidebarLogo className="h-8 w-auto" mobile />

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
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
