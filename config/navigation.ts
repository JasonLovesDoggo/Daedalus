import { Clock, LayoutDashboard, NotebookPen, QrCode } from "lucide-react";

export const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Applications",
    href: "/applications",
    icon: NotebookPen,
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: Clock,
  },
  {
    name: "QR Code",
    href: "/qrcode",
    icon: QrCode,
  },
];
