"use client";

import { usePathname } from "next/navigation";
import { NewsletterBanner } from "./newsletter-banner";

export function NewsletterBannerWrapper() {
  const pathname = usePathname();
  const showBanner = pathname?.startsWith("/blog");
  
  if (!showBanner) return null;
  return <NewsletterBanner />;
} 