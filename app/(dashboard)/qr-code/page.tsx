import Link from "next/link";
import { getCurrentUser } from "@/auth";
import { ScanQrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/PageWrapper";

export default async function QRCodePage() {
  const user = await getCurrentUser();

  if (!user?.id) {
    return null;
  }

  const profileUrl = `https://app.hackcanada.org/profile/${user.id}`;
  const isAdminOrOrganizer = user.role === "admin" || user.role === "organizer";

  return (
    <PageWrapper>
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
        {/* Page Header */}
        <div className="space-y-2">
          <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
            <h1 className="font-rubik text-3xl font-bold">Your QR Code</h1>
          </div>
          <p className="text-textMuted max-md:text-sm">
            Use this QR code for event check-ins and sharing your public
            profile!
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-10">
          {/* QR Code Section - Takes up 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div className="group relative flex h-full flex-col gap-6 rounded-lg border-2 border-primary/15 p-8 before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-br before:from-primary/10 before:via-info/15 before:to-primaryLight/20 before:opacity-75 hover:border-primary/25 hover:before:opacity-100">
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <QRCodeSVG
                    value={profileUrl}
                    size={275}
                    level="H"
                    imageSettings={{
                      src: "/beaver-wave.webp",
                      height: 60,
                      width: 60,
                      excavate: true,
                    }}
                  />
                </div>
                <div className="max-w-md space-y-2 text-center">
                  <p className="text-sm text-muted-foreground md:text-base">
                    Screenshot and save this QR code to your device for quick
                    and easy access during the event. You&apos;ll need it for
                    check-ins and other activities!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Admin/Organizer Section - Takes up 2 columns on large screens */}
          {!isAdminOrOrganizer && (
            <div className="lg:col-span-2">
              <div className="relative flex h-full flex-col gap-6 rounded-lg border-2 border-info/20 p-8 before:absolute before:inset-0 before:-z-10 before:rounded-lg before:bg-gradient-to-br before:from-info/5 before:via-primary/10 before:to-info/5 before:opacity-75">
                <div className="space-y-2">
                  <h2 className="bg-gradient-to-r from-info via-sky-400 to-info bg-clip-text text-xl font-semibold text-transparent">
                    Organizer Actions
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Access special features available to organizers and
                    administrators.
                  </p>
                </div>

                <div className="mt-auto space-y-4">
                  <Link href="/qr-code/scanner" className="block">
                    <Button
                      className="group relative w-full overflow-hidden border border-info bg-info/10 py-6 text-lg hover:bg-info/20"
                      variant="outline"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-info/30 via-primary/20 to-info/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="relative flex items-center justify-center gap-2">
                        QR Code Scanner
                        <ScanQrCode className="size-5" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <BackButton />
    </PageWrapper>
  );
}
