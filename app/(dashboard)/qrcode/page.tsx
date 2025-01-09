import { Metadata } from "next";

import { EmptyPage } from "@/components/EmptyPage";

export const metadata: Metadata = {
  title: "QR Code",
};

const QrCodePage = () => {
  return (
    <EmptyPage
      title="QR Code Page"
      message="Your personalized QR Code will be available here closer to the event date."
    />
  );
};
export default QrCodePage;
