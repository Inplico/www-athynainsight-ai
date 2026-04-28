"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import React from "react";

export const SimpleHeader: React.FC = () => {
  const pathname = usePathname() ?? "";
  const isHome = pathname === "/";
  const isResearch = pathname.startsWith("/research");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between gap-8">
          <Link href="/" className="flex items-center" aria-label="Athyna Insight — Home">
            <Image
              src="/images/brand/Athyna Insight_Secondary Logo_TransparentBG.png"
              alt="Athyna Insight"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink href="/" active={isHome}>
              Home
            </NavLink>
            <NavLink href="/research" active={isResearch}>
              Research
            </NavLink>
            <Link
              href="/#early-access"
              className="ml-2 sm:ml-3 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-orange-400 to-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(249,115,22,0.30)] hover:from-orange-500 hover:to-orange-600 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_18px_rgba(249,115,22,0.45)] transition"
            >
              Request early access
              <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ href, active, children }: NavLinkProps): React.ReactElement {
  return (
    <Link
      href={href}
      className={`relative text-sm font-medium px-3 py-2 transition-colors ${
        active ? "text-slate-900" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      {children}
      {active && (
        <span
          aria-hidden
          className="absolute left-3 right-3 -bottom-[1px] h-0.5 rounded-full bg-orange-500"
        />
      )}
    </Link>
  );
}
