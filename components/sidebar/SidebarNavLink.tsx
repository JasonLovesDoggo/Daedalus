import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarNavLinkProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

const SidebarNavLink = ({ name, href, icon: Icon }: SidebarNavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center space-x-4 rounded-md p-2 transition-colors duration-300",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-textSecondary hover:bg-backgroundMuted",
      )}
    >
      <Icon
        size={24}
        className={cn(
          "transition-transform duration-300",
          isActive && "scale-[1.2]",
        )}
      />
      <span
        className={cn(
          "transition-all duration-300",
          isActive
            ? "translate-x-2 font-semibold tracking-wider"
            : "font-normal group-hover:translate-x-1",
        )}
      >
        {name}
      </span>
    </Link>
  );
};

export default SidebarNavLink;
