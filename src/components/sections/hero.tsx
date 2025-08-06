import Link from "next/link";
import { siteConfig } from "@/lib/constants";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/stat-card";
import React from "react";

const stats = [
  { value: "<2 sec", label: "Response Time" },
  { value: "100%", label: "Expert Validated" },
  { value: "50+", label: "Edmonton Zones" },
  { value: "15+ yrs", label: "Domain Expertise" },
];

export function Hero(): React.ReactNode {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Sacred geometry background pattern */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-orange-500 to-amber-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <Container className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-600">
            The Only Building Code AI You Can Trust
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Revolutionary AI-powered compliance platform that bridges zoning regulations and building codes. 
            Get instant, expert-validated answers from address to building requirements in seconds.
          </p>
          <p className="mt-4 text-lg font-semibold text-muted-foreground">
            Expert-Validated AI | Building Code Compliance | Municipal Integration
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href={siteConfig.links.consultation}>
                Get Early Access
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about" prefetch={false}>
                See How It Works
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              className="transform transition-transform hover:scale-105"
            />
          ))}
        </div>
      </Container>

      {/* Sacred geometry background pattern */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-orange-500 to-amber-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
