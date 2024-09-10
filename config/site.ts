import { SidebarLink } from "@/types/app";

export const sidebarLinks: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/",
  },
];

// No need for an over-the-top site config for SEO purposes as almost the entire site is password protected and cannot be access by bots or scrapers anyway
export const siteConfig = {
  title: "Hack Canada",
  description:
    "Canada's largest hackathon with over 5000+ hackers and sponsors.",
};
