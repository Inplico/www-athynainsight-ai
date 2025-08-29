"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import React from "react";

export const SimpleHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex h-20 items-center justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/brand/Athyna Insight_Secondary Logo_TransparentBG.png"
              alt="Athyna Insight"
              width={200}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
        </div>
      </Container>
    </header>
  );
};