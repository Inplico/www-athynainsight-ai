"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Copy,
  FileText,
  Info,
  Lightbulb,
} from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";

const SECTION_IDS = ["core", "article", "outcome", "continued"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function PaperPage(): ReactElement {
  const [activeSection, setActiveSection] = useState<SectionId>("article");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY + 200;
      let current: SectionId = SECTION_IDS[0];
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const handleCopy = () => {
    void navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-slate-100">
        <Container className="py-6">
          <div className="flex flex-wrap justify-between items-center gap-4 text-[13px] text-slate-500">
            <div>
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 hover:text-slate-900 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Research
              </Link>
              <span className="mx-2 text-slate-300">/</span>
              <span className="text-slate-900 font-medium">When Standards Become Constraints</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              May 5, 2026
            </div>
          </div>
        </Container>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(255,107,53,0.10), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 30%, rgba(0,119,182,0.06), transparent 60%)",
          }}
        />
        <Container className="relative py-20 sm:py-24">
          <div className="flex items-center gap-4 mb-8 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full text-xs font-medium text-slate-700 shadow-sm">
              <span className="bg-orange-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.08em]">
                PAPER 03
              </span>
              Third in series
            </span>
          </div>
          <h1 className="text-[clamp(40px,6vw,80px)] font-bold tracking-[-0.035em] leading-none text-slate-900 mb-6 max-w-5xl">
            When Standards Become Constraints.
          </h1>
          <p className="text-[clamp(20px,2vw,26px)] text-slate-700 leading-tight max-w-3xl mb-12">
            Why We Must Rethink How Regulatory Knowledge Is Structured.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto_auto] gap-6 items-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm max-w-3xl">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 text-white font-semibold text-[15px] flex items-center justify-center">
              MF
            </div>
            <div>
              <div className="text-sm text-slate-900 font-semibold">Maple Rose Furigay, PMP®</div>
              <div className="text-xs text-slate-500 mt-0.5">Series Author</div>
            </div>
            <div className="inline-flex items-center gap-2 text-[13px] text-slate-700 font-medium">
              <Calendar className="w-4 h-4 text-slate-400" />
              May 5, 2026
            </div>
            <div className="inline-flex items-center gap-2 text-[13px] text-slate-700 font-medium">
              <FileText className="w-4 h-4 text-slate-400" />
              Paper 03
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile sticky TOC */}
      <nav className="lg:hidden sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
        <div className="overflow-x-auto">
          <div className="flex gap-2 px-4 py-3 whitespace-nowrap">
            {[
              { id: "core", label: "Core Idea" },
              { id: "article", label: "Article" },
              { id: "outcome", label: "Outcome" },
              { id: "continued", label: "Continued" },
            ].map((item) => {
              const isCurrent = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    isCurrent
                      ? "bg-orange-100 text-orange-700"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* WRAPPED: Sidebar + sections */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-20 max-w-[1180px] mx-auto">
            {/* Sidebar */}
            <aside className="hidden lg:block text-[13px] lg:sticky lg:top-[100px] lg:self-start">
              <div className="pb-6 border-b border-slate-100 mb-6">
                <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-bold mb-3.5">
                  Author
                </div>
                <div className="flex gap-3 items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 text-white font-semibold text-sm flex items-center justify-center shrink-0">
                    MF
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">
                      Maple Rose Furigay, PMP®
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Series Author</div>
                  </div>
                </div>
                <div className="text-xs text-slate-500 inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  May 5, 2026
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-bold mb-3.5">
                On this page
              </div>
              <nav className="flex flex-col gap-1 pb-6 border-b border-slate-100 mb-6">
                {[
                  { id: "core", label: "Core Idea" },
                  { id: "article", label: "Article" },
                  { id: "outcome", label: "Outcome" },
                  { id: "continued", label: "To be continued" },
                ].map((item) => {
                  const isCurrent = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] leading-snug transition-colors ${
                        isCurrent
                          ? "bg-orange-100/80 text-orange-700 font-semibold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`rounded-full transition-all ${
                          isCurrent ? "w-2 h-2 bg-orange-500" : "w-1.5 h-1.5 bg-slate-300"
                        }`}
                      />
                      {item.label}
                    </a>
                  );
                })}
              </nav>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white border border-slate-100 rounded-[10px] text-[13px] text-slate-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 transition-colors w-full"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? "Copied!" : "Copy link"}
                </button>
              </div>
            </aside>

            {/* Right column */}
            <div className="min-w-0">
              {/* CORE */}
              <div
                id="core"
                className="mb-16 bg-gradient-to-br from-orange-50 to-white border border-orange-200 rounded-3xl p-8 sm:p-10 relative overflow-hidden"
              >
                <div
                  aria-hidden
                  className="absolute -top-[30%] -right-[10%] w-1/2 aspect-square pointer-events-none"
                  style={{
                    background: "radial-gradient(closest-side, rgba(255,107,53,0.18), transparent 70%)",
                    filter: "blur(40px)",
                  }}
                />
                <div className="relative inline-flex items-center gap-2.5 mb-5">
                  <span className="w-9 h-9 bg-white border border-orange-200 rounded-[10px] flex items-center justify-center text-orange-500 shadow-[0_1px_2px_rgba(255,107,53,0.10)]">
                    <Lightbulb className="w-[18px] h-[18px]" />
                  </span>
                  <span className="text-[11px] text-orange-600 tracking-[0.2em] uppercase font-bold">
                    Core Idea
                  </span>
                </div>
                <p className="relative text-[clamp(20px,2.2vw,26px)] leading-[1.45] text-slate-900 font-medium tracking-[-0.005em]">
                  Many of today&rsquo;s challenges in the built environment do not stem from the
                  intent of regulation, but from how regulatory knowledge is organized, accessed,
                  and interpreted.
                </p>
              </div>

              {/* ARTICLE */}
              <article id="article" className="max-w-[720px]">
                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7 first-letter:text-[88px] first-letter:font-bold first-letter:float-left first-letter:leading-[0.85] first-letter:pt-3 first-letter:pr-4 first-letter:text-orange-500 first-letter:tracking-[-0.03em]">
                  Modern building codes and regulatory frameworks were designed to protect public
                  safety, ensure quality, and establish trust. In principle, they function
                  effectively as societal agreements, codifying decades of collective expertise.
                  However, the way this knowledge is currently structured&mdash;primarily as static,
                  document-based systems&mdash;has become a growing constraint in an increasingly
                  complex and fast-moving world.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  Regulatory information is typically distributed across PDFs, guidelines,
                  standards, bulletins, and jurisdiction-specific interpretations. While
                  comprehensive, these formats are not inherently designed for clarity,
                  interoperability, or real-time decision-making. As a result, professionals must
                  navigate fragmented sources, manually interpret relationships between provisions,
                  and reconcile inconsistencies across jurisdictions.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  This challenge is amplified by the increasing complexity of projects. Buildings
                  today must respond to evolving requirements related to sustainability, energy
                  performance, accessibility, fire safety, and climate resilience&mdash;often across
                  overlapping regulatory layers. The more interconnected the requirements become,
                  the more difficult it is to interpret them consistently within a document-based
                  paradigm.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  A critical consequence is interpretation variability. Two qualified
                  professionals&mdash;or even two Authorities Having Jurisdiction (AHJ)&mdash;may
                  arrive at different conclusions based on the same set of regulations. This
                  variability introduces uncertainty, delays, redesign cycles, and increased costs.
                  Importantly, it is not a failure of expertise, but a limitation of how information
                  is structured and accessed.
                </p>

                {/* Pull quote */}
                <div className="my-16 py-10 border-y border-slate-100 text-center">
                  <div className="text-orange-500 text-5xl font-semibold leading-none mb-4">&ldquo;</div>
                  <p className="text-[clamp(22px,2.5vw,28px)] leading-tight text-slate-900 font-medium tracking-[-0.015em] max-w-[640px] mx-auto">
                    Standards&mdash;originally designed to create consistency&mdash;can
                    unintentionally become constraints. Not because they are incorrect, but because
                    their format does not support the way modern decisions need to be made.
                  </p>
                </div>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  In this context, standards&mdash;originally designed to create
                  consistency&mdash;can unintentionally become constraints. Not because they are
                  incorrect, but because their format does not support the way modern decisions
                  need to be made: quickly, collaboratively, and across interconnected systems.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  To move forward, regulatory knowledge must evolve from static documents into
                  structured, relational systems. This means organizing rules not just as text, but
                  as interconnected logic&mdash;where dependencies, conditions, and exceptions are
                  explicitly mapped and navigable.
                </p>

                {/* RII callout */}
                <div className="my-12 px-8 py-7 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
                    <span className="bg-slate-900 text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.08em] inline-flex items-center gap-1.5">
                      <Info className="w-3 h-3" />
                      KEY CONCEPT
                    </span>
                    <span className="text-[13px] text-orange-600 font-semibold tracking-[0.05em] uppercase">
                      Regulatory Intelligence Infrastructure (RII)
                    </span>
                  </div>
                  <p className="text-[17px] leading-relaxed text-slate-900 font-medium">
                    Reframing regulatory knowledge as structured, relational
                    systems&mdash;preserving the authority of standards while enabling clearer
                    interpretation, more consistent application, and stronger alignment across
                    stakeholders.
                  </p>
                </div>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  <strong className="text-slate-900 font-semibold">
                    Regulatory Intelligence Infrastructure (RII)
                  </strong>{" "}
                  represents this shift, enabling clearer interpretation, more consistent
                  application, and stronger alignment across stakeholders.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700">
                  Reframing regulatory knowledge in this way does not change the authority of
                  standards. It enhances their usability. It preserves intent while enabling
                  clarity at scale.
                </p>
              </article>

              {/* OUTCOME */}
              <div
                id="outcome"
                className="mt-16 bg-slate-900 rounded-3xl p-8 sm:p-10 relative overflow-hidden text-white"
              >
                <div
                  aria-hidden
                  className="absolute -top-[30%] -right-[10%] w-1/2 aspect-square pointer-events-none"
                  style={{
                    background: "radial-gradient(closest-side, rgba(255,107,53,0.20), transparent 70%)",
                    filter: "blur(60px)",
                  }}
                />
                <div className="relative inline-flex items-center gap-3 mb-5">
                  <span className="w-9 h-9 bg-orange-500 rounded-[10px] flex items-center justify-center text-white">
                    <CheckCircle className="w-[18px] h-[18px]" />
                  </span>
                  <span className="text-[11px] text-orange-500 tracking-[0.2em] uppercase font-bold">
                    Outcome
                  </span>
                </div>
                <p className="relative text-[clamp(20px,2.2vw,26px)] leading-[1.35] font-semibold tracking-[-0.015em]">
                  The future of regulation depends not only on what standards say, but on how they
                  are structured. Unlocking their full value requires transforming regulatory
                  knowledge into a form that can support consistent, transparent, and scalable
                  decision-making.
                </p>
              </div>

              {/* CONTINUED */}
              <div
                id="continued"
                className="mt-8 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-6 items-start shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shrink-0 shadow-[0_8px_24px_rgba(255,107,53,0.30)]">
                  <ArrowRight className="w-[26px] h-[26px]" />
                </div>
                <div>
                  <div className="text-[11px] text-orange-600 tracking-[0.2em] uppercase font-bold mb-3">
                    To be continued
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight leading-tight mb-3 text-slate-900">
                    The next paper in the series
                  </h3>
                  <p className="text-base leading-relaxed text-slate-700 mb-4">
                    The next paper introduces regulatory intelligence as a distinct layer within
                    the building ecosystem, enabling alignment between policy, design, and
                    execution at scale.
                  </p>
                  <div className="text-[13px] text-slate-500">
                    <strong className="text-slate-900 font-semibold">Maple Rose Furigay, PMP®</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* AUTHOR */}
      <section className="bg-white border-t border-slate-100 py-16">
        <Container className="max-w-[880px]">
          <div className="flex gap-6 items-center p-7 bg-white border border-slate-100 rounded-2xl flex-wrap">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 text-white font-semibold text-[22px] flex items-center justify-center shrink-0">
              MF
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-[11px] text-orange-600 tracking-[0.2em] uppercase font-bold mb-1">
                Series Author
              </div>
              <div className="text-lg font-semibold text-slate-900">Maple Rose Furigay, PMP®</div>
              <div className="text-[13px] text-slate-500 mt-1">
                Reimagining Regulation as Intelligent Infrastructure
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 sm:py-24">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,107,53,0.20), transparent 60%)",
          }}
        />
        <Container className="relative z-[2] max-w-[720px] text-center">
          <div className="text-[11px] text-orange-500 font-semibold uppercase tracking-[0.25em] mb-4">
            Athyna Insight
          </div>
          <h3 className="text-[clamp(32px,4.5vw,56px)] font-bold tracking-[-0.025em] leading-[1.05] mb-5">
            Step Into the Future of{" "}
            <em className="not-italic text-orange-500 italic font-medium">Compliance</em>.
          </h3>
          <p className="text-[17px] text-white/65 leading-relaxed mb-8 max-w-[540px] mx-auto">
            Reserve your spot for early access to trusted, next-generation AI for the built
            environment.
          </p>
          <Link
            href="/#early-access"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-b from-orange-400 to-orange-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_8px_24px_rgba(249,115,22,0.32)] hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_14px_32px_rgba(249,115,22,0.45)] transition"
          >
            Request early access
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="mt-4">
            <Link
              href="/research"
              className="inline-block text-[13px] text-white/55 hover:text-orange-500 transition-colors"
            >
              ← Back to all papers
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
