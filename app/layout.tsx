import type { Metadata } from "next";

import "./globals.css";

import { Inter } from "next/font/google";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.title}`,
    default: siteConfig.title,
  },
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={cn("", inter.className)}>
        <Toaster richColors position="bottom-center" />
        <SessionProvider session={session}>
          <div className="flex h-full min-h-svh flex-col">
            <div>{children}</div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
