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
        "flex items-center space-x-4 rounded-md p-2",
        "hover:bg-backgroundMuted",
        isActive ? "text-primary" : "text-textSecondary",
      )}
    >
      <Icon size={24} />
      <span>{name}</span>
    </Link>
  );
};

export default SidebarNavLink;
