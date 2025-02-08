import { useCallback, useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { toast } from "sonner";

import { Event } from "@/config/qr-code";

import { useCameraPermission } from "./useCameraPermission";

interface UseQRScannerProps {
  selectedEvent: Event | "";
}

export const useQRScanner = ({ selectedEvent }: UseQRScannerProps) => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [startingCamera, setStartingCamera] = useState(false);
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(
    null,
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReader = useRef(new BrowserMultiFormatReader());
  const isProcessing = useRef(false);
  const { hasCameraPermission } = useCameraPermission();

  const playSound = useCallback(async (type: "success" | "error") => {
    try {
      await new Audio(`/${type}.mp3`).play();
    } catch (error) {
      console.error(`Failed to play ${type} sound:`, error);
    }
  }, []);

  const stopCamera = useCallback(() => {
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
      toast.error("Failed to stop camera");
    }
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleCheckIn = async (userId: string) => {
    try {
      // For testing purposes
      // const troo = true;
      // if (troo) {
      //   setScanResult("success");
      //   new Audio("/success.mp3").play().catch(console.error);
      //   return;
      // }

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

      await playSound("success");
      setScanResult("success");
      toast.success("Check-in successful!");
    } catch (error) {
      await playSound("error");
      setScanResult("error");
      toast.error(
        error instanceof Error ? error.message : "Failed to check in",
      );
    } finally {
      stopCamera();
      isProcessing.current = false;
      setTimeout(() => setScanResult(null), 500);
    }
  };

  const startCamera = async () => {
    setStartingCamera(true);

    if (!selectedEvent) {
      toast.error("Please select an event first");
      return;
    }

    if (!hasCameraPermission) {
      toast.error("Camera access is required for scanning QR codes");
      return;
    }

    try {
      // Start the QR code reader directly with constraints
      await codeReader.current.decodeFromVideoDevice(
        null, // Use default device
        videoRef.current,
        async (
          result: { getText(): string } | null,
          error: Error | undefined,
        ) => {
          if (error || !result || isProcessing.current) return;

          const scannedUrl = result.getText();
          const userId = scannedUrl.split("/profile/")[1];

          if (!userId) {
            await playSound("error");
            toast.error("Invalid QR code");
            setScanResult("error");
            setTimeout(() => setScanResult(null), 1000);
            return;
          }

          isProcessing.current = true;
          await handleCheckIn(userId);
        },
      );

      setIsCameraOn(true);
    } catch (err) {
      console.error("Scanner error:", err);
      toast.error(
        "Failed to start camera. Please ensure you have granted camera permissions and try again.",
      );
      setIsCameraOn(false);
    } finally {
      setStartingCamera(false);
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
    hasCameraPermission,
    startingCamera,
  };
};
