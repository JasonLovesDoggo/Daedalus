import Image from "next/image";

import { BackButton } from "@/components/ui/back-button";
import { Tabs } from "@/components/ui/tabs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center bg-gradient-to-b from-[#0A1F44] via-slate-200 to-white px-4 pb-12 pt-24 md:pb-20 md:pt-36">
      <Image
        src="/grainy-texture.jpg"
        fill
        alt="idk"
        className="pointer-events-none absolute inset-0 object-cover opacity-5"
      />

      <div className="absolute left-4 top-4">
        <BackButton className="border border-transparent text-gray-300 hover:border-white/25 hover:bg-white/10 hover:text-white" />
      </div>
      <div className="w-full max-w-sm">
        <Tabs />
        {children}
      </div>
    </div>
  );
}
