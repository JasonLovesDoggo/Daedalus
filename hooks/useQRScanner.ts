import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "sonner";

import { CONTAINER_STYLES, Event, SCANNER_CONFIG } from "@/config/qr-code";

// Get raw CSS content
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

interface UseQRScannerProps {
  selectedEvent: Event | "";
  hasCameraPermission: boolean | null;
}

export const useQRScanner = ({
  selectedEvent,
  hasCameraPermission,
}: UseQRScannerProps) => {
  const [isCameraInitializing, setIsCameraInitializing] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
          SCANNER_CONFIG,
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

              handleScanFeedback("success");
            } catch (error) {
              handleScanFeedback("error", error);
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

  const handleScanFeedback = (type: "success" | "error", error?: unknown) => {
    // Play sound effect
    new Audio(`/${type}.mp3`).play().catch(console.error);

    // Show visual feedback
    if (containerRef.current) {
      containerRef.current.style.backgroundColor = CONTAINER_STYLES[type];
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.backgroundColor = "";
        }
      }, 500);
    }

    // Show toast message
    if (type === "success") {
      toast.success("Check-in successful!");
    } else {
      toast.error(
        error instanceof Error ? error.message : "Failed to check in",
      );
    }
  };

  const clearScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(console.error);
      scannerRef.current = null;
    }
  };

  return {
    isCameraInitializing,
    containerRef,
    clearScanner,
  };
};
