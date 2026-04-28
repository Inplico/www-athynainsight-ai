import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export function SimpleFooter(): React.ReactElement {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Container className="py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4 pb-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 text-center sm:text-left">
            <Image
              src="/images/brand/Athyna Insight_Secondary Logo_TransparentBG.png"
              alt="Athyna Insight"
              width={140}
              height={32}
              className="h-7 w-auto invert opacity-90 mx-auto sm:mx-0"
            />
            <span className="text-[13px] text-white/55">Reimagining the Way We Build</span>
          </div>
          <nav className="flex items-center justify-center sm:justify-end gap-3">
            <Link
              href="/research"
              className="text-[13px] font-medium text-white/85 hover:text-orange-500 transition-colors px-3 py-2"
            >
              Research
            </Link>
            <Link
              href="/#early-access"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold text-white bg-gradient-to-b from-orange-400 to-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_12px_rgba(249,115,22,0.30)] hover:from-orange-500 hover:to-orange-600 transition"
            >
              Request early access
              <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mt-5 text-xs text-white/40 text-center sm:text-left">
          <span>&copy; 2026 Athyna Insight Inc.</span>
          <span>All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}
