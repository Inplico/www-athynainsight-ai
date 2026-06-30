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
              <span className="text-slate-900 font-medium">Human + Machine Collaboration</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              June 26, 2026
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
                PAPER 05
              </span>
              Fifth in series
            </span>
          </div>
          <h1 className="text-[clamp(40px,6vw,80px)] font-bold tracking-[-0.035em] leading-none text-slate-900 mb-6 max-w-5xl">
            Human + Machine Collaboration.
          </h1>
          <p className="text-[clamp(20px,2vw,26px)] text-slate-700 leading-tight max-w-3xl mb-12">
            Elevating Expertise Through Structured Intelligence.
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
              June 26, 2026
            </div>
            <div className="inline-flex items-center gap-2 text-[13px] text-slate-700 font-medium">
              <FileText className="w-4 h-4 text-slate-400" />
              Paper 05
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
                  June 26, 2026
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
                  Artificial intelligence does not replace professional expertise&mdash;it can amplify
                  it, structuring knowledge in ways that support clearer interpretation, more
                  consistent application, and stronger decision-making.
                </p>
              </div>

              {/* ARTICLE */}
              <article id="article" className="max-w-[720px]">
                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7 first-letter:text-[88px] first-letter:font-bold first-letter:float-left first-letter:leading-[0.85] first-letter:pt-3 first-letter:pr-4 first-letter:text-orange-500 first-letter:tracking-[-0.03em]">
                  Across the built environment, professional judgment sits at the center of critical
                  decisions. Architects, engineers, regulators, builders, and owners navigate
                  complexity not through rigid formulas, but through expertise shaped by experience,
                  context, and interpretation. This human dimension is essential to how regulatory
                  systems function and why they have historically relied on professional discretion.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  As discussions about artificial intelligence expand, questions often arise about
                  automation replacing expertise. Yet in highly regulated, safety-critical domains,
                  the more meaningful opportunity may not be replacing judgment, but strengthening it.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  The challenge many professionals face today is not a lack of expertise, but the
                  growing complexity of the knowledge they must interpret. Building codes, standards,
                  zoning bylaws, and related requirements are increasingly interconnected, making
                  consistent application difficult even for experienced practitioners. Much of the
                  effort involved in compliance-related decision-making is spent navigating fragmented
                  information, tracing dependencies, and reconciling interpretations before
                  higher-value judgment can even be applied.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  This is where structured intelligence offers a different model. Rather than treating
                  artificial intelligence as a substitute for expertise, human-in-the-loop systems
                  position technology as a support layer&mdash;helping structure complex knowledge
                  while keeping expert judgment central to decision-making. In this model, machine
                  intelligence assists in organizing, relating, and surfacing relevant information,
                  while professionals retain discretion, interpretation, and accountability.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  This distinction matters. In the context of Regulatory Intelligence Infrastructure
                  (RII), the goal is not to automate regulatory interpretation, but to make the
                  underlying knowledge more navigable and transparent. By structuring regulatory
                  relationships&mdash;dependencies, exceptions, conditions, and cross-references&mdash;RII
                  can help reduce ambiguity and support greater consistency in how professionals apply
                  their expertise. Importantly, clearer structure does not remove discretion; it
                  improves the conditions under which discretion is exercised.
                </p>

                {/* Pull quote */}
                <div className="my-16 py-10 border-y border-slate-100 text-center">
                  <div className="text-orange-500 text-5xl font-semibold leading-none mb-4">&ldquo;</div>
                  <p className="text-[clamp(22px,2.5vw,28px)] leading-tight text-slate-900 font-medium tracking-[-0.015em] max-w-[640px] mx-auto">
                    This creates a shift from automation toward augmentation&mdash;structured
                    intelligence does not replace professional reasoning, it elevates it.
                  </p>
                </div>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  Rather than replacing professional reasoning, structured intelligence can help
                  elevate it&mdash;reducing time spent searching and reconciling information, and
                  enabling greater focus on judgment, problem-solving, and collaboration. The work
                  that remains is the work that most depends on human expertise.
                </p>

                {/* Key concept callout */}
                <div className="my-12 px-8 py-7 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
                    <span className="bg-slate-900 text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.08em] inline-flex items-center gap-1.5">
                      <Info className="w-3 h-3" />
                      KEY CONCEPT
                    </span>
                    <span className="text-[13px] text-orange-600 font-semibold tracking-[0.05em] uppercase">
                      Augmentation Over Automation
                    </span>
                  </div>
                  <p className="text-[17px] leading-relaxed text-slate-900 font-medium">
                    A human-in-the-loop model in which machine intelligence structures, relates, and
                    surfaces complex regulatory knowledge while professionals retain discretion,
                    interpretation, and accountability&mdash;technology as a support layer, not a
                    substitute for judgment.
                  </p>
                </div>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  This has important implications for how expertise is shared across the building
                  ecosystem. When regulatory knowledge is more clearly structured, collaboration
                  between designers, regulators, consultants, and owners can become more aligned.
                  Discussions can shift from debating where requirements reside to engaging more
                  effectively on how they should be interpreted and applied. In this sense, structured
                  intelligence can support not only better individual decisions, but higher-value
                  collaboration across stakeholders.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  It may also strengthen continuity of expertise. As many industries face retirement
                  cycles and the loss of institutional knowledge, systems that help structure and
                  support expert reasoning may contribute to preserving and extending professional
                  insight across generations.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                  This perspective reframes artificial intelligence in the built environment&mdash;not
                  as replacing professionals, but as enabling them to work at a higher level. The
                  opportunity is not machine intelligence versus human expertise; it is human
                  expertise elevated through structured intelligence.
                </p>

                <p className="text-[19px] leading-[1.85] text-slate-700">
                  As regulatory systems continue to grow in complexity, this human + machine
                  collaboration may become an increasingly important part of how safer, faster, and
                  more adaptive decisions are made across the built environment.
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
                  Structured intelligence can support better professional decision-making by elevating
                  expertise, preserving judgment, and enabling clearer, more consistent collaboration
                  across the building ecosystem.
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
                    The next paper explores how structured regulatory intelligence can become a
                    long-term knowledge asset&mdash;capturing expertise, supporting continuity across
                    generations, and enabling learning systems for the built environment.
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
