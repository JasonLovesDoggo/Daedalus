interface ScannerConfig {
  fps: number;
  qrbox: {
    width: number;
    height: number;
  };
  aspectRatio: number;
  showTorchButtonIfSupported: boolean;
  showZoomSliderIfSupported: boolean;
  defaultZoomValueIfSupported: number;
}

export const EVENTS = [
  "hackathon-check-in",
  "friday-dinner",
  "saturday-breakfast",
  "saturday-lunch",
  "saturday-dinner",
  "sunday-breakfast",
  "sunday-lunch",
] as const;

export type Event = (typeof EVENTS)[number];

export const SCANNER_CONFIG: ScannerConfig = {
  fps: 10,
  qrbox: {
    width: 250,
    height: 250,
  },
  aspectRatio: 1.0,
  showTorchButtonIfSupported: false,
  showZoomSliderIfSupported: false,
  defaultZoomValueIfSupported: 2,
};

export const CONTAINER_STYLES = {
  success: "rgba(76, 175, 80, 0.2)",
  error: "rgba(244, 67, 54, 0.2)",
} as const;
