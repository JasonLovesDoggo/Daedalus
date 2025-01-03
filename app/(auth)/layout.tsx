import { BackButton } from "@/components/ui/back-button";
import { Tabs } from "@/components/ui/tabs";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center px-4 py-12 md:py-20">
      <div className="absolute left-4 top-4">
        <BackButton />
      </div>
      <div className="w-full max-w-md">
        <Tabs />
        {children}
      </div>
    </div>
  );
}
