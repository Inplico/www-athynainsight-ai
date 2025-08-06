import { Container } from "@/components/ui/container"

const programs = [
  {
    title: "Free Trial",
    subtitle: "$0/month",
    description:
      "Perfect for testing our platform and understanding the power of AI-driven compliance.",
    features: [
      "25 queries/month",
      "Edmonton zones only",
      "Basic building code search",
      "Email support",
    ],
  },
  {
    title: "Professional",
    subtitle: "$79/month",
    description:
      "Ideal for individual real estate agents and small architectural practices.",
    features: [
      "500 queries/month", 
      "5 expert validations",
      "Priority response times",
      "Search history & bookmarks",
    ],
  },
  {
    title: "Team",
    subtitle: "$149/month",
    description:
      "Built for small firms handling multiple projects across different zones.",
    features: [
      "2,000 queries/month",
      "15 expert validations",
      "Multi-user access",
      "API integration ready",
    ],
  },
  {
    title: "Enterprise",
    subtitle: "$299/month",
    description:
      "Complete solution for large developers and architectural firms.",
    features: [
      "Unlimited queries",
      "50 expert validations",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
]

export function Programs() {
  return (
    <div className="py-24 bg-gray-950">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Choose the plan that fits your compliance needs
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <div
              key={program.title}
              className="relative group rounded-2xl overflow-hidden bg-gray-900 p-6 transition-all duration-300 hover:scale-105"
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-[1px] bg-gray-900 rounded-2xl" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white">{program.title}</h3>
                <p className="text-sm text-orange-400 mb-4">{program.subtitle}</p>
                <p className="text-gray-400 text-sm mb-6">{program.description}</p>
                <ul className="space-y-3">
                  {program.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <svg
                        className="w-4 h-4 mr-2 text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Municipal and white-label pricing available
          </p>
          <p className="text-sm text-gray-500">
            Expert validations: $15 each (vs $25 on-demand) | API Access: $0.10/query
          </p>
        </div>
      </Container>
    </div>
  )
} 