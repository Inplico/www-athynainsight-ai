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
      <Container className="py-7">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <Image
              src="/images/brand/Athyna Insight_Secondary Logo_TransparentBG.png"
              alt="Athyna Insight"
              width={140}
              height={32}
              className="h-7 w-auto invert opacity-90"
            />
            <span className="text-[13px] text-white/55">Reimagining the Way We Build</span>
          </div>
          <nav className="flex items-center gap-7">
            <Link href="/research" className="text-[13px] text-white/85 hover:text-orange-500 transition-colors">
              Research
            </Link>
            <Link href="/#early-access" className="text-[13px] text-white/85 hover:text-orange-500 transition-colors">
              Request early access
            </Link>
          </nav>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 mt-5 text-xs text-white/40">
          <span>&copy; 2026 Athyna Insight Inc.</span>
          <span>All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}
