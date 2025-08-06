import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ParallaxBanner } from "@/components/ui/parallax-banner";
import { ClientOnly } from "@/components/client-only";

export default function Contact(): React.ReactElement {
  return (
    <ClientOnly>
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <ParallaxBanner
          src="/images/voxgenius/banner-ai-network.jpg"
          alt="AI Network"
          opacity={0.8}
        />

        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Contact Us
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Get in touch with us to discuss your AI transformation journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact options grid */}
      <div className="relative z-20 py-24 bg-gray-900/90 backdrop-blur-sm sm:py-32">
        <Container>
          <div className="mx-auto grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
            <div className="relative flex flex-col items-center rounded-2xl bg-gray-900/50 p-8 ring-1 ring-white/10 hover:ring-white/20">
              <div className="mb-4 rounded-full bg-indigo-500/10 p-3">
                <svg
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Schedule a Call
              </h3>
              <p className="mt-2 mb-8 text-sm text-gray-300 text-center">
                Book a strategy session to discuss your goals.
              </p>
              <Button asChild variant="outline" className="mt-auto" size="lg">
                <Link href="https://www.cognitivetech.net/meeting">
                  Book Now
                </Link>
              </Button>
            </div>

            <div className="relative flex flex-col items-center rounded-2xl bg-indigo-500/10 p-8 ring-2 ring-indigo-500">
              <div className="mb-4 rounded-full bg-indigo-500/10 p-3">
                <svg
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Partner With Us
              </h3>
              <p className="mt-2 mb-8 text-sm text-gray-300 text-center">
                Apply to join our partner program and grow with us.
              </p>
              <Button asChild className="mt-auto" size="lg">
                <Link href="https://forms.fillout.com/t/my8pM7RU9zus">
                  Apply Now
                </Link>
              </Button>
            </div>

            <div className="relative flex flex-col items-center rounded-2xl bg-gray-900/50 p-8 ring-1 ring-white/10 hover:ring-white/20">
              <div className="mb-4 rounded-full bg-indigo-500/10 p-3">
                <svg
                  className="h-6 w-6 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Watch Demo</h3>
              <p className="mt-2 mb-8 text-sm text-gray-300 text-center">
                See VoxGenius in action with a personalized demo.
              </p>
              <Button asChild variant="outline" className="mt-auto" size="lg">
                <Link href="https://www.cognitivetech.net/meeting">
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Contact form section */}
      <div className="relative z-20 py-24 bg-gray-950/90 backdrop-blur-sm sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Send us a message
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Have a specific question? We&apos;d love to hear from you. Fill
              out our contact form and we&apos;ll get back to you shortly.
            </p>
            <div className="mt-10">
              <Button asChild size="lg">
                <Link href="https://forms.fillout.com/t/my8pM7RU9zus">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </ClientOnly>
  );
}
