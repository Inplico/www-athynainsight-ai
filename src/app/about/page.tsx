import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import React from "react";

export const metadata = {
  title: "About - Athyna Insight",
  description:
    "Enterprise AI solutions with expert validation and regulatory compliance.",
};

export default function AboutPage(): React.ReactNode {
  return (
    <main>
      <Container className="py-12 lg:py-24">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Bridging AI Innovation and Enterprise Reality
            </h1>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Athyna Insight was founded on the principle that AI transformation 
              shouldn't require choosing between innovation and reliability. We deliver both.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-center text-3xl font-bold tracking-tight mb-6">
              Our Mission
            </h2>

            <p>
              At Athyna Insight, we believe that the future of business lies in the intelligent 
              integration of AI systems that are not only powerful but also trustworthy. Our mission 
              is to democratize access to enterprise-grade AI solutions while maintaining the highest 
              standards of accuracy, compliance, and security.
            </p>

            <p>
              Founded by technology leaders with decades of experience in AI, cloud architecture, 
              and enterprise software, we understand the challenges organizations face when adopting 
              AI at scale. That's why we've built a comprehensive platform that addresses every 
              aspect of the AI journey... from initial strategy to production deployment and beyond.
            </p>

            <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-semibold mb-2">
                What Sets Us Apart
              </h3>
              <p className="mb-3">
                Unlike traditional AI vendors, we combine cutting-edge technology with rigorous 
                expert validation, ensuring that every solution we deliver meets the exacting 
                standards of regulated industries while pushing the boundaries of what's possible.
              </p>
            </div>

            <h2>Our Core Principles</h2>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="p-5 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">
                  Expert Validation First
                </h3>
                <p>
                  Every AI output is reviewed by domain experts before deployment. 
                  We don't just build AI systems; we ensure they're accurate, reliable, 
                  and aligned with industry best practices.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">
                  Regulatory Compliance Built-In
                </h3>
                <p>
                  From HIPAA to SOC 2, from GDPR to industry-specific regulations, 
                  our solutions are designed with compliance at their core, not as 
                  an afterthought.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">
                  Enterprise-Grade Architecture
                </h3>
                <p>
                  Built on proven cloud infrastructure with security, scalability, 
                  and reliability engineered into every layer of our technology stack.
                </p>
              </div>

              <div className="p-5 rounded-lg border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold mb-3">
                  Continuous Innovation
                </h3>
                <p>
                  We stay at the forefront of AI research and development, constantly 
                  improving our solutions to deliver the best possible outcomes for 
                  our clients.
                </p>
              </div>
            </div>

            <blockquote className="my-8 border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 pl-6 py-4 pr-4 rounded-r-lg italic">
              <p className="text-xl text-indigo-900 dark:text-indigo-200">
                "In the age of AI, trust isn't just important... it's everything. 
                That's why we've made expert validation and compliance the foundation 
                of everything we build."
              </p>
              <footer className="mt-2 text-sm">— Athyna Insight Leadership Team</footer>
            </blockquote>

            <h2>Our Expertise</h2>

            <ul>
              <li>
                <strong>Healthcare AI</strong>: HIPAA-compliant solutions for clinical decision support, 
                patient engagement, and operational efficiency
              </li>
              <li>
                <strong>Financial Services</strong>: Risk assessment, fraud detection, and regulatory 
                reporting with full audit trails
              </li>
              <li>
                <strong>Government & Public Sector</strong>: Secure, compliant AI solutions for 
                citizen services and operational optimization
              </li>
              <li>
                <strong>Enterprise Operations</strong>: Process automation, predictive analytics, 
                and intelligent document processing
              </li>
              <li>
                <strong>Customer Experience</strong>: Voice AI, chatbots, and personalization 
                engines that delight users while protecting privacy
              </li>
            </ul>

            <h2>Our Commitment</h2>

            <p>
              We're committed to making AI transformation accessible to organizations of all sizes, 
              from startups to Fortune 500 companies. Our flexible engagement models... from consulting 
              to fully managed solutions... ensure that you get exactly the support you need to succeed.
            </p>

            <p>
              When you partner with Athyna Insight, you're not just getting an AI vendor. You're 
              getting a team of experts dedicated to your success, with the technology, expertise, 
              and commitment to help you navigate the complex landscape of enterprise AI adoption.
            </p>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
              <p className="mb-6">
                Let's discuss how Athyna Insight can help you leverage AI to achieve your business goals.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}