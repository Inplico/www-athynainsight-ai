"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";

export const SimpleHeader: React.FC = () => {
  const pathname = usePathname() ?? "";
  const isHome = pathname === "/";
  const isResearch = pathname.startsWith("/research");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-16 sm:h-20 items-center justify-between gap-2 sm:gap-3">
          <Link href="/" className="flex items-center" aria-label="Athyna Insight — Home">
            <Image
              src="/images/brand/Athyna Insight_Secondary Logo_TransparentBG.png"
              alt="Athyna Insight"
              width={200}
              height={50}
              className="h-9 sm:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <NavLink href="/" active={isHome}>
              Home
            </NavLink>
            <NavLink href="/research" active={isResearch}>
              Research
            </NavLink>
            <CTA className="ml-2 lg:ml-3" />
          </nav>

          {/* Mobile right side: compact CTA + burger */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/#early-access"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[13px] font-semibold text-white bg-gradient-to-b from-orange-400 to-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(249,115,22,0.30)] active:translate-y-0.5 transition"
            >
              Early access
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors text-slate-700"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <Container className="py-3 flex flex-col gap-1">
            <Link
              href="/"
              className={`px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                isHome ? "bg-orange-50 text-orange-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/research"
              className={`px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                isResearch ? "bg-orange-50 text-orange-700" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Research
            </Link>
          </Container>
        </div>
      )}
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

function CTA({ className = "" }: { className?: string }): React.ReactElement {
  return (
    <Link
      href="/#early-access"
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-b from-orange-400 to-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(249,115,22,0.30)] hover:from-orange-500 hover:to-orange-600 hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_18px_rgba(249,115,22,0.45)] transition ${className}`}
    >
      Request early access
      <span aria-hidden>→</span>
    </Link>
  );
}
