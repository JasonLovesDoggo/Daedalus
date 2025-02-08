"use client";

import { useState } from "react";

import { Event } from "@/config/qr-code";
import { useCameraPermission } from "@/hooks/useCameraPermission";
import { useQRScanner } from "@/hooks/useQRScanner";
import { EventSelector } from "@/components/EventSelector";
import { QRScannerSection } from "@/components/QRScannerSection";

export function Scanner() {
  const [selectedEvent, setSelectedEvent] = useState<Event | "">("");
  const { hasCameraPermission } = useCameraPermission();
  const { isCameraInitializing, containerRef, clearScanner } = useQRScanner({
    selectedEvent,
    hasCameraPermission,
  });

  const handleEventChange = (value: string) => {
    clearScanner();
    setSelectedEvent(value as Event);
  };

  return (
    <div
      ref={containerRef}
      className="group relative flex flex-col gap-8 rounded-xl border-2 border-primary/15 p-8 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-primary/10 before:via-info/15 before:to-primaryLight/20 before:opacity-75 before:transition hover:border-primary/25 hover:before:opacity-100"
    >
      <EventSelector
        selectedEvent={selectedEvent}
        onEventChange={handleEventChange}
      />

      {selectedEvent && (
        <QRScannerSection
          isCameraInitializing={isCameraInitializing}
          hasCameraPermission={hasCameraPermission}
        />
      )}
    </div>
  );
}
