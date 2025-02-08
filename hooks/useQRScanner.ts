import { useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { toast } from "sonner";

import { Event } from "@/config/qr-code";

interface UseQRScannerProps {
  selectedEvent: Event | "";
}

export const useQRScanner = ({ selectedEvent }: UseQRScannerProps) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(
    null,
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const isProcessing = useRef(false);

  const stopCamera = () => {
    try {
      codeReader.current.reset();
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    } catch (err) {
      console.error("Error stopping camera:", err);
    }
  };

  const handleCheckIn = async (userId: string) => {
    try {
      const troo = true;

      if (troo) {
        setScanResult("success");
        new Audio("/success.mp3").play().catch(console.error);
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

      // Play success sound and show success feedback
      new Audio("/success.mp3").play().catch(console.error);
      setScanResult("success");
      toast.success("Check-in successful!");
    } catch (error) {
      // Play error sound and show error feedback
      new Audio("/error.mp3").play().catch(console.error);
      setScanResult("error");
      toast.error(
        error instanceof Error ? error.message : "Failed to check in",
      );
    } finally {
      isProcessing.current = false;

      // Reset scan result after animation
      setTimeout(() => {
        setScanResult(null);
      }, 500);
    }
  };

  const startCamera = async () => {
    if (!selectedEvent) {
      toast.error("Please select an event first");
      return;
    }

    try {
      // Request camera permission first
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      stream.getTracks().forEach((track) => track.stop());

      // Start QR code scanning
      await codeReader.current.decodeFromVideoDevice(
        null,
        videoRef.current,
        (result, error) => {
          if (error || !result || isProcessing.current) return;

          const scannedUrl = result.getText();
          const userId = scannedUrl.split("/profile/")[1];

          if (!userId) {
            toast.error("Invalid QR code");
            setScanResult("error");
            setTimeout(() => setScanResult(null), 1000);
            return;
          }

          isProcessing.current = true;
          stopCamera();
          handleCheckIn(userId);
        },
      );

      setIsCameraOn(true);
    } catch (err) {
      console.error("Scanner error:", err);
      toast.error("Failed to start camera. Please check your permissions.");
      setIsCameraOn(false);
    }
  };

  const handleToggleCamera = async () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      await startCamera();
    }
  };

  return {
    isCameraOn,
    videoRef,
    handleToggleCamera,
    scanResult,
  };
};
