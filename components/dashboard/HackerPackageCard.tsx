import { Download } from "lucide-react";

import { buttonVariants } from "../ui/button";

const HackerPackageCard = () => {
  return (
    <div className="col-span-1 overflow-hidden lg:col-span-2">
      <div className="group relative flex h-full min-h-[250px] flex-col gap-4 overflow-hidden rounded-md border border-border bg-backgroundMuted p-6 transition hover:border-primaryLight hover:shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            Hacker Package
          </h2>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Download className="h-5 w-5 text-primary" />
          </div>
        </div>

        <p className="pb-2 text-textMuted">
          Download your hacker package containing essential information,
          schedule, and resources for Hack Canada 2025.
        </p>

        <div className="mt-auto flex items-center gap-2">
          <a
            href="/hacker-package.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              className: "inline-flex items-center gap-2",
            })}
          >
            Get Package
            <Download className="h-4 w-4" />
          </a>
        </div>

        {/* Decorative elements */}
        <div className="ease-[cubic-bezier(0.25,0.1,0.25,1)] absolute -right-16 -top-16 h-32 w-32 rotate-12 rounded-lg bg-primaryLight/10 transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110 group-hover:opacity-80" />
        <div className="ease-[cubic-bezier(0.25,0.1,0.25,1)] absolute -right-8 -top-8 h-24 w-24 rotate-12 rounded-lg bg-primaryLight/5 transition-all duration-500 group-hover:translate-y-1 group-hover:scale-110 group-hover:opacity-80" />
      </div>
    </div>
  );
};

export default HackerPackageCard;
