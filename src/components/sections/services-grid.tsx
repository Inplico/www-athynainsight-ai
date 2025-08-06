"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

const services = {
  solutions: [
    {
      title: "Real Estate Professionals",
      description: "Instant zoning answers and building requirements for 500+ transactions per year",
    },
    {
      title: "Architectural Firms",
      description: "Systematized expertise for residential and commercial permit applications",
    },
    {
      title: "Property Developers",
      description: "Feasibility analysis across multiple municipalities with cost impact awareness",
    },
    {
      title: "Municipal Departments",
      description: "White-label solutions to reduce counter inquiries with consistent interpretations",
    },
  ],
  features: [
    {
      title: "Zone-Filtered RAG Search",
      description: "AI searches only relevant building code sections based on property zoning",
    },
    {
      title: "Expert Certification System",
      description: "Human-in-the-loop validation with confidence scoring for legal defensibility",
    },
    {
      title: "Multi-Municipality Support",
      description: "5-week onboarding for new cities with scalable cloud infrastructure",
    },
    {
      title: "Real-Time Compliance",
      description: "Dynamic integration with municipal APIs for always-current requirements",
    },
  ],
}

export function ServicesGrid() {
  const [activeCategory, setActiveCategory] = useState<"solutions" | "features">("solutions")

  return (
    <div className="py-24 bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
            Who We Serve & What We Deliver
          </h2>
        </div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-800 p-1">
            {["solutions", "features"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as typeof activeCategory)}
                className={cn(
                  "px-6 py-2.5 text-sm font-medium rounded-md transition-colors",
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services[activeCategory].map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-lg bg-gray-800/50 p-6 transition-all duration-300 hover:bg-gray-800/70"
            >
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-500/5 to-amber-500/5 group-hover:from-orange-500/10 group-hover:to-amber-500/10 transition-colors" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
} 