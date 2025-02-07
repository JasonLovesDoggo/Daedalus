"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const events = [
  "hackathon-check-in",
  "friday-dinner",
  "saturday-breakfast",
  "saturday-lunch",
  "saturday-dinner",
  "sunday-breakfast",
  "sunday-lunch",
];

// Custom styles to clean up scanner UI
const scannerStyles = `
  #qr-reader__status_span,
  #qr-reader__dashboard_section_swaplink {
    display: none !important;
  }
  
  #qr-reader__dashboard_section_csr > div:first-child {
    text-align: center !important;
    margin-bottom: 1rem !important;
  }
  
  #qr-reader__dashboard_section_csr > div:first-child > img {
    display: none !important;
  }
  
  #qr-reader__camera_selection {
    width: 100% !important;
    padding: 0.75rem 1rem !important;
    border: 1px solid rgba(30, 144, 255, 0.2) !important;
    border-radius: 0.5rem !important;
    background-color: rgba(255, 255, 255, 0.05) !important;
    color: inherit !important;
    font-size: 0.875rem !important;
    line-height: 1.25rem !important;
    outline: none !important;
    transition: all 0.2s ease-in-out !important;
  }

  #qr-reader__camera_selection:hover {
    border-color: rgba(30, 144, 255, 0.4) !important;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }

  #qr-reader {
    border: none !important;
    padding: 0 !important;
    width: 100% !important;
    max-width: 600px !important;
    margin: 0 auto !important;
  }

  #qr-reader__scan_region {
    position: relative !important;
    min-height: 300px !important;
    border-radius: 0.5rem !important;
    overflow: hidden !important;
    background: rgba(0, 0, 0, 0.2) !important;
  }

  #qr-reader__scan_region::before {
    content: "" !important;
    position: absolute !important;
    inset: 0 !important;
    border: 2px solid rgba(30, 144, 255, 0.3) !important;
    border-radius: 0.5rem !important;
    z-index: 1 !important;
  }

  #qr-reader__scan_region > img {
    opacity: 0.4 !important;
    filter: grayscale(1) !important;
    transition: all 0.3s ease-in-out !important;
  }

  #qr-reader video {
    border-radius: 0.5rem !important;
  }
`;

export function Scanner() {
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [isCameraInitializing, setIsCameraInitializing] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check camera permissions
  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput",
        );

        if (videoDevices.length === 0) {
          setHasCameraPermission(false);
          toast.error(
            "No camera devices found. Please ensure a camera is connected.",
          );
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: videoDevices[0].deviceId,
          },
        });
        stream.getTracks().forEach((track) => track.stop());
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Camera permission error:", error);
        setHasCameraPermission(false);
        toast.error("Camera access is required for scanning QR codes");
      }
    };

    checkCameraPermission();
  }, []);

  useEffect(() => {
    // Add custom styles
    const style = document.createElement("style");
    style.textContent = scannerStyles;
    document.head.appendChild(style);

    // Initialize scanner if not already done and camera permission is granted
    if (!scannerRef.current && selectedEvent && hasCameraPermission) {
      setIsCameraInitializing(true);

      try {
        scannerRef.current = new Html5QrcodeScanner(
          "qr-reader",
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: false,
            showZoomSliderIfSupported: false,
            defaultZoomValueIfSupported: 2,
          },
          false,
        );

        // Start scanning
        scannerRef.current.render(
          async (decodedText: string) => {
            try {
              // Extract userId from profile URL
              const userId = decodedText.split("/profile/")[1];
              if (!userId) {
                toast.error("Invalid QR code");
                return;
              }

              const response = await fetch("/api/check-ins", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId,
                  eventName: selectedEvent,
                }),
              });

              if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to check in");
              }

              // Play success sound
              new Audio("/success.mp3").play().catch(console.error);

              // Show success message with container background flash
              if (containerRef.current) {
                containerRef.current.style.backgroundColor =
                  "rgba(76, 175, 80, 0.2)";
                setTimeout(() => {
                  if (containerRef.current) {
                    containerRef.current.style.backgroundColor = "";
                  }
                }, 500);
              }
              toast.success("Check-in successful!");
            } catch (error) {
              // Play error sound
              new Audio("/error.mp3").play().catch(console.error);

              // Show error message with container background flash
              if (containerRef.current) {
                containerRef.current.style.backgroundColor =
                  "rgba(244, 67, 54, 0.2)";
                setTimeout(() => {
                  if (containerRef.current) {
                    containerRef.current.style.backgroundColor = "";
                  }
                }, 500);
              }
              toast.error(
                error instanceof Error ? error.message : "Failed to check in",
              );
            }
          },
          (error: string) => {
            console.error("Scanner error:", error);
            setIsCameraInitializing(false);

            if (error.includes("NotFound")) {
              toast.error(
                "No camera found. Please ensure your camera is connected and not in use by another application.",
              );
            } else if (error.includes("NotAllowed")) {
              toast.error(
                "Camera access was denied. Please allow camera access to use the scanner.",
              );
              setHasCameraPermission(false);
            } else if (error.includes("NotReadable")) {
              toast.error(
                "Camera is in use by another application. Please close other apps using the camera and try again.",
              );
            } else {
              toast.error(
                "Scanner error. Please refresh the page and try again.",
              );
            }
          },
        );

        // Scanner initialized successfully
        setIsCameraInitializing(false);
      } catch (error: unknown) {
        console.error("Camera initialization error:", error);
        setIsCameraInitializing(false);
        toast.error(
          "Failed to initialize camera. Please refresh and try again.",
        );
      }
    }

    // Cleanup function
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
      }
      document.head.removeChild(style);
    };
  }, [selectedEvent, hasCameraPermission]);

  const handleEventChange = (value: string) => {
    // Clear previous scanner instance if exists
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
    setSelectedEvent(value);
  };

  return (
    <div
      ref={containerRef}
      className="group relative flex flex-col gap-8 rounded-xl border-2 border-primary/15 p-8 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-primary/10 before:via-info/15 before:to-primaryLight/20 before:opacity-75 before:transition hover:border-primary/25 hover:before:opacity-100"
    >
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-textPrimary">
            Select Event
          </h2>
          <p className="text-sm text-textSecondary/80">
            Choose the event you want to check participants into
          </p>
        </div>

        <Select value={selectedEvent} onValueChange={handleEventChange}>
          <SelectTrigger className="border-primary/20 bg-background/50 backdrop-blur-sm">
            <SelectValue placeholder="Select event for check-in" />
          </SelectTrigger>
          <SelectContent>
            {events.map((event) => (
              <SelectItem key={event} value={event}>
                {event
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedEvent && (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-textPrimary">
              Scan QR Code
            </h2>
            <p className="text-sm text-textSecondary/80">
              Point the camera at a participant&apos;s QR code to check them in
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-primary/20 bg-backgroundMuted/50 backdrop-blur-sm transition-colors duration-300">
            <div id="qr-reader" className="w-full" />
          </div>
        </div>
      )}

      {isCameraInitializing && (
        <div className="rounded-lg bg-primary/10 p-4 text-center text-sm text-primary">
          Initializing camera...
        </div>
      )}

      {hasCameraPermission === false && (
        <div className="rounded-lg bg-red-500/10 p-4 text-center text-sm text-red-500">
          Camera access is required. Please allow camera access in your browser
          settings and refresh the page.
        </div>
      )}
    </div>
  );
}
