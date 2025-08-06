import { Container } from "@/components/ui/container";
import React from "react";

const offerings = [
  {
    title: "Address to Requirements",
    description:
      "Enter any Edmonton address and instantly get specific building code parts, occupancy classifications, and zoning requirements.",
  },
  {
    title: "Expert Validation Built-In",
    description:
      "Every response is certified by domain experts with 15+ years of architectural experience, providing legal defensibility.",
  },
  {
    title: "Bridging Two Worlds",
    description:
      "The only platform that seamlessly connects municipal zoning bylaws with provincial building codes in one unified system.",
  },
];

export function ValueProp(): React.ReactNode {
  return (
    <div className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
      <Container>
        <div className="mx-auto max-w-2xl text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Compliance Revolution
          </h2>
          <p className="mt-4 text-gray-300">
            We're transforming how professionals interact with building codes. No more hours searching through 
            PDFs... get instant, accurate answers with expert validation you can trust.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {offerings.map((offering) => (
            <div
              key={offering.title}
              className="relative overflow-hidden rounded-lg bg-gray-800/50 p-6 backdrop-blur-sm transition-transform hover:scale-105"
            >
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white">
                  {offering.title}
                </h3>
                <p className="mt-2 text-sm text-gray-300">
                  {offering.description}
                </p>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/10 to-amber-500/10" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
