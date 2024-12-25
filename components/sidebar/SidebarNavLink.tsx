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
        "group flex items-center space-x-4 rounded-md p-2",
        "hover:bg-backgroundMuted",
        isActive ? "text-primary" : "text-textSecondary",
      )}
    >
      <Icon
        size={24}
        className={cn("transition-transform", isActive && "scale-[1.2]")}
      />
      <span
        className={cn(
          "transition-all duration-200",
          isActive
            ? "translate-x-2 font-semibold"
            : "font-normal group-hover:translate-x-1",
        )}
      >
        {name}
      </span>
    </Link>
  );
};

export default SidebarNavLink;
