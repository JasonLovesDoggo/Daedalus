import Image from "next/image";
import { getCurrentUser } from "@/auth";
import { QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { cn } from "@/lib/utils";
import { BackButton } from "@/components/ui/back-button";
import PageWrapper from "@/components/PageWrapper";
import QrCodeOrganizerActions from "@/components/QrCodeOrganizerActions";

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
        {/* Enhanced Page Header */}
        <div className="flex items-center gap-3">
          <div className="space-y-1">
            <div className="group flex w-fit items-center gap-2">
              <div className="rounded-full bg-gradient-to-br from-primary/10 to-info/10 p-2">
                <QrCode
                  strokeWidth={2.5}
                  className="size-5 text-primary transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110"
                />
              </div>

              <div className="w-fit bg-gradient-to-r from-primary via-sky-400 to-primary bg-clip-text text-transparent">
                <h1 className="font-rubik text-3xl font-bold">Your QR Code</h1>
              </div>
            </div>
            <p className="text-sm text-textMuted md:text-base">
              Use this QR code for event check-ins and sharing your public
              profile!
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-10">
          {/* Enhanced QR Code Section - Takes up 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div
              className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-lg border-2 border-primary/20 bg-white/50 p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-lg"
              role="region"
              aria-label="QR Code Display"
            >
              <div className="pointer-events-none absolute inset-0 -z-10">
                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-info/30 via-primaryLight/30 to-primary/30 opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-100" />

                {/* Mesh gradient pattern */}
                <div className="absolute inset-0 opacity-0 mix-blend-normal transition-all duration-700 group-hover:opacity-80">
                  <div className="absolute inset-0 bg-[radial-gradient(at_70%_20%,rgba(120,119,198,0.3),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(at_30%_80%,rgba(59,130,246,0.3),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_80%_50%,rgba(59,130,246,0.25),transparent_25%)]" />
                </div>

                {/* Noise texture */}
                <div className="absolute inset-0 opacity-5 mix-blend-soft-light transition group-hover:opacity-20">
                  <Image
                    src="/grainy-texture.jpg"
                    alt="Grainy texture"
                    fill
                    sizes="50px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* QR Code Content */}
              <div className="flex flex-col items-center gap-6">
                <div
                  className={cn(
                    "relative z-10 mt-4 overflow-hidden rounded-xl border bg-white p-4 shadow-xl shadow-primary/15",
                    "transition-all duration-500 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/25",
                    "group-hover:border-primary/40",
                  )}
                >
                  {/* Animated background effects for QR code */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {/* Spinning highlight */}
                    <div className="absolute inset-0 animate-[spin_4s_linear_infinite] opacity-75">
                      <div className="absolute inset-0 rotate-45 transform-gpu rounded-full bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-md" />
                    </div>
                    {/* Pulsing radial gradient */}
                    <div className="absolute inset-0 animate-[pulse_2s_ease-in-out_infinite] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_60%)]" />
                  </div>

                  <QRCodeSVG
                    value={profileUrl}
                    size={200}
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
                  <p className="text-sm text-textSecondary transition-colors duration-300 group-hover:text-textPrimary md:text-base">
                    Screenshot and save this QR code to your device for quick
                    and easy access during the event. You&apos;ll need it for
                    check-ins and other activities!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isAdminOrOrganizer && (
            <div className="lg:col-span-2">
              <QrCodeOrganizerActions />
            </div>
          )}
        </div>
      </div>
      <BackButton />
    </PageWrapper>
  );
}
