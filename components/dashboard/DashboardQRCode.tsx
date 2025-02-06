import { QrCode } from "lucide-react";

import { Button, buttonVariants } from "../ui/button";
import LockedState from "./LockedState";

interface DashboardQRCodeProps {
  isLocked: boolean;
}

const DashboardQRCode = ({ isLocked }: DashboardQRCodeProps) => {
  return (
    <div className="lg:col-span-2">
      <div
        className={`group relative flex h-full min-h-[250px] flex-col gap-0 rounded-md border-2 p-6 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:transition ${
          isLocked
            ? "border-gray-200/50 before:bg-gradient-to-br before:from-primary/20 before:via-info/15 before:to-primaryLight/10 before:opacity-25"
            : "border-primary/15 before:bg-gradient-to-br before:from-primary/10 before:via-info/20 before:to-primaryLight/30 before:opacity-75 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/10 hover:before:opacity-100"
        }`}
      >
        {isLocked && <LockedState label="Participants Only" />}

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-textPrimary">
            Your QR Code
          </h2>
          <QrCode className="size-8 transition-transform duration-500 md:size-8" />
        </div>

        <p className="pb-8 text-textPrimary/70">
          Access your unique QR code for event check-ins and sharing your public
          profile!
        </p>

        <div className="mt-auto flex items-center gap-2">
          <Button
            disabled={isLocked}
            variant={isLocked ? "outline" : "default"}
            className={`inline-flex items-center gap-2 ${
              isLocked
                ? "pointer-events-none cursor-not-allowed !text-gray-400 opacity-40 hover:bg-transparent"
                : ""
            }`}
          >
            View QR Code
            <QrCode className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardQRCode;
