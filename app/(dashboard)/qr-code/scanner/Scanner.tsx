"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { Event } from "@/config/qr-code";
import { cn } from "@/lib/utils";
import { useQRScanner } from "@/hooks/useQRScanner";
import { EventSelector } from "@/components/EventSelector";

export function Scanner() {
  const [selectedEvent, setSelectedEvent] = useState<Event | "">("");
  const {
    isCameraOn,
    videoRef,
    handleToggleCamera,
    scanResult,
    hasCameraPermission,
  } = useQRScanner({
    selectedEvent,
  });

  return (
    <>
      <div className="flex flex-col gap-8 rounded-md border-2 border-primary/25 p-4 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primaryLight/50 md:p-6">
        {/* Visual feedback overlay */}
        {scanResult && (
          <div
            className={`absolute -inset-full z-50 animate-flash duration-500 ${
              scanResult === "success" ? "bg-success" : "bg-error"
            }`}
          />
        )}

        <EventSelector
          selectedEvent={selectedEvent}
          onEventChange={(value) => setSelectedEvent(value as Event)}
        />
      </div>
      {selectedEvent && (
        <div className="relative flex flex-col items-center">
          {/* Camera container */}
          <div className="group relative mx-auto w-full max-w-96 rounded-md border-2 border-primary/25 bg-primary/25 p-2 transition-all duration-500">
            <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-md">
              {!hasCameraPermission && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-backgroundMuted p-4 text-center">
                  <AlertCircle className="h-8 w-8 text-error" />
                  <p className="text-sm font-medium text-textPrimary/70">
                    Camera access is required to scan QR codes. Please enable
                    camera permissions in your browser settings.
                  </p>
                </div>
              )}
              <video
                ref={videoRef}
                style={{
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                }}
                className={cn(
                  "absolute inset-0 scale-x-0 scale-y-0 rounded-[50px] transition-all duration-500",
                  {
                    "scale-x-100 scale-y-100 rounded-[0px]": isCameraOn,
                  },
                )}
              />
              {hasCameraPermission && (
                <button
                  onClick={handleToggleCamera}
                  className={cn(
                    "flex h-full w-full items-center justify-center bg-backgroundMuted text-lg font-semibold text-textPrimary/70 transition hover:text-textPrimary",
                    {
                      "opacity-0": isCameraOn,
                    },
                  )}
                >
                  Turn On Camera
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
