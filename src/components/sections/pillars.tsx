import { Container } from "@/components/ui/container";
import React from "react";

const pillars = [
  {
    title: "Policy Authority",
    items: [
      "National Research Council",
      "Building Code Task Group",
      "Safety Codes Officer Training",
    ],
    gradient: "from-orange-500 to-orange-600",
  },
  {
    title: "Technical Excellence",
    items: [
      "AI Hackathon Winner 2023",
      "Google Cloud Architecture",
      "<2 Second Response Times",
    ],
    gradient: "from-amber-500 to-amber-600",
  },
  {
    title: "Domain Expertise",
    items: [
      "15+ Years Architecture",
      "Municipal Relationships",
      "Expert Certification Network",
    ],
    gradient: "from-orange-600 to-amber-700",
  },
];

export function Pillars(): React.ReactNode {
  return (
    <div className="py-24 bg-gray-950">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
            Why We're Different
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            The only team combining policy authority, technical excellence, and domain expertise 
            to deliver building code AI you can actually trust for legal compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="relative group rounded-2xl overflow-hidden p-8 transition-all duration-300 hover:scale-105"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
              />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-6 text-white">
                  {pillar.title}
                </h3>
                <ul className="space-y-4">
                  {pillar.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center text-gray-300 group-hover:text-white transition-colors"
                    >
                      <svg
                        className="w-5 h-5 mr-3 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
