import Link from "next/link";
import { usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface SidebarNavLinkProps {
  name: string;
  href: string;
  icon: LucideIcon;
  setIsOpen?: (open: boolean) => void;
}

const SidebarNavLink = ({
  name,
  href,
  icon: Icon,
  setIsOpen,
}: SidebarNavLinkProps) => {
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
      onClick={() => setTimeout(() => setIsOpen?.(false), 300)}
    >
      <Icon
        className={cn(
          "size-6 transition-transform",
          isActive && "lg:scale-[1.2]",
        )}
      />
      <span
        className={cn(
          "transition-all duration-300",
          isActive
            ? "translate-x-2 tracking-wider lg:font-semibold"
            : "font-normal group-hover:translate-x-1",
        )}
      >
        {name}
      </span>
    </Link>
  );
};

export default SidebarNavLink;
