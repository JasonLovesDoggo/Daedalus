import { useEffect, useState } from "react";
import { toast } from "sonner";

export const useCameraPermission = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setHasCameraPermission(false);
          toast.error(
            "Camera access is not supported on this device or browser",
          );
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        stream.getTracks().forEach((track) => track.stop());
        setHasCameraPermission(true);
      } catch (error) {
        alert(error);
        setHasCameraPermission(false);
        toast.error("Camera access is required for scanning QR codes");
      }
    };

    checkCameraPermission();
  }, []);

  return { hasCameraPermission };
};
