import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/constants";
import { SimpleHeader } from "@/components/layout/simple-header";
import { SimpleFooter } from "@/components/layout/simple-footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      {
        url: "/images/brand/athyna-logo.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/brand/athyna-logo.png",
        type: "image/png",
      },
    ],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps): ReactElement {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className={inter.className} suppressHydrationWarning>
        <div className="relative flex min-h-screen flex-col">
          <SimpleHeader />
          <main className="flex-1">{children}</main>
          <SimpleFooter />
        </div>
      </body>
    </html>
  );
}
