"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import React from "react";

export const SimpleHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <Container>
        <div className="flex h-16 items-center justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/brand/athyna-logo.png"
              alt="Athyna Insight"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
            <span className="font-bold text-lg">
              Athyna Insight
            </span>
          </Link>
        </div>
      </Container>
    </header>
  );
};