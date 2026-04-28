"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  Copy,
  FileText,
  Info,
  Layers,
} from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";

const SECTION_IDS = ["premise", "article", "papers"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function IntroductionPage(): ReactElement {
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
              <span className="text-slate-900 font-medium">Series Introduction</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              April 22, 2026
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
          <span className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-white border border-slate-100 rounded-full text-xs font-medium text-slate-700 shadow-sm">
            <span className="bg-slate-900 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.08em]">
              SERIES INTRO
            </span>
            First in series
          </span>
          <h1 className="text-[clamp(40px,6vw,80px)] font-bold tracking-[-0.035em] leading-none text-slate-900 mb-6 max-w-5xl">
            Reimagining Regulation as{" "}
            <span className="bg-gradient-to-br from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Intelligent
            </span>{" "}
            Infrastructure.
          </h1>
          <p className="text-[clamp(20px,2vw,26px)] text-slate-700 leading-tight max-w-3xl mb-12">
            A new foundation for safer, faster, and more resilient built environments.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-6 items-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm max-w-3xl">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-blue-600 text-white font-semibold text-[15px] flex items-center justify-center">
              MF
            </div>
            <div>
              <div className="text-sm text-slate-900 font-semibold">Maple Rose Furigay, PMP®</div>
              <div className="text-xs text-slate-500 mt-0.5">Series Author</div>
            </div>
            <div className="inline-flex items-center gap-2 text-[13px] text-slate-700 font-medium">
              <Calendar className="w-4 h-4 text-slate-400" />
              April 22, 2026
            </div>
          </div>
        </Container>
      </section>

      {/* WRAPPED: sidebar + (premise + article) */}
      <section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-20 max-w-[1180px] mx-auto">
            {/* Sidebar */}
            <aside className="text-[13px] lg:sticky lg:top-[100px] lg:self-start">
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
                  April 22, 2026
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-bold mb-3.5">
                On this page
              </div>
              <nav className="flex flex-col gap-1 pb-6 border-b border-slate-100 mb-6">
                {[
                  { id: "premise", label: "Premise" },
                  { id: "article", label: "Introduction" },
                  { id: "papers", label: "Papers in series" },
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

            {/* Right column: Premise + Article */}
            <div className="min-w-0">
              {/* PREMISE */}
              <div
                id="premise"
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
                    <Layers className="w-[18px] h-[18px]" />
                  </span>
                  <span className="text-[11px] text-orange-600 tracking-[0.2em] uppercase font-bold">
                    Series Premise
                  </span>
                </div>
                <p className="relative text-[clamp(20px,2.2vw,26px)] leading-[1.45] text-slate-900 font-medium tracking-[-0.005em]">
                  The knowledge embedded within regulatory systems remains largely fragmented,
                  text-based, and difficult to interpret consistently across jurisdictions.
                </p>
              </div>

              {/* ARTICLE */}
              <article id="article" className="max-w-[720px]">
                <p className="text-[19px] leading-[1.85] text-slate-700 mb-7 first-letter:text-[88px] first-letter:font-bold first-letter:float-left first-letter:leading-[0.85] first-letter:pt-3 first-letter:pr-4 first-letter:text-orange-500 first-letter:tracking-[-0.03em]">
                The built environment is shaped by a vast network of regulations intended to protect
                safety, ensure quality, and support the orderly growth of communities. Building codes,
                zoning bylaws, and technical standards form a shared language that guides how we design,
                construct, and adapt the spaces where people live, work, and play. Yet while these
                regulatory systems are essential to public trust, the knowledge embedded within them
                remains largely fragmented, text-based, and difficult to interpret consistently across
                jurisdictions.
              </p>

              <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                As the complexity of our built environment increases, so too does the need for clearer,
                more structured ways of understanding and applying regulatory requirements. Housing
                shortages, climate change, aging infrastructure, and evolving social needs are placing
                unprecedented pressure on governments and industry to deliver safe, resilient, and
                adaptable spaces more efficiently. At the same time, advances in artificial
                intelligence and data science create new opportunities to rethink how regulatory
                knowledge can function as infrastructure that supports collaboration rather than
                friction.
              </p>

              {/* Definition callout */}
              <div className="my-12 px-8 py-7 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2.5 mb-3.5 flex-wrap">
                  <span className="bg-slate-900 text-white px-2.5 py-1 rounded text-[10px] font-bold tracking-[0.08em] inline-flex items-center gap-1.5">
                    <Info className="w-3 h-3" />
                    DEFINITION
                  </span>
                  <span className="text-[13px] text-orange-600 font-semibold tracking-[0.05em] uppercase">
                    Regulatory Intelligence Infrastructure (RII)
                  </span>
                </div>
                <p className="text-[17px] leading-relaxed text-slate-900 font-medium">
                  An evolving category of digital infrastructure that structures regulatory knowledge
                  into accessible, machine-readable intelligence.
                </p>
              </div>

              <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                This white paper series explores the emergence of{" "}
                <strong className="text-slate-900 font-semibold">
                  Regulatory Intelligence Infrastructure (RII)
                </strong>{" "}
                — an evolving category of digital infrastructure that structures regulatory knowledge
                into accessible, machine-readable intelligence. RII represents a new layer within the
                building ecosystem, enabling clearer interpretation of interconnected rules,
                definitions, and compliance pathways across jurisdictions. By making regulatory
                knowledge more structured and navigable, RII supports more consistent decision-making
                while preserving the critical role of professional expertise and regulatory authority.
              </p>

              <p className="text-[19px] leading-[1.85] text-slate-700 mb-7">
                The series examines how standards evolve, why regulatory knowledge must become more
                structured and accessible, and how human expertise combined with technology can
                strengthen alignment across projects, disciplines, and jurisdictions. It considers how
                shared regulatory understanding can help communities respond more effectively to
                complex challenges, including climate resilience, disaster recovery, economic
                productivity, and equitable access to safe spaces.
              </p>

              <p className="text-[19px] leading-[1.85] text-slate-700">
                Reimagining regulation as intelligent infrastructure is not about replacing human
                judgment, but about strengthening the foundation upon which safer, more sustainable,
                and more resilient communities can be built.
              </p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      {/* PAPERS NAV */}
      <section
        className="bg-slate-50 border-y border-slate-100 py-20"
        id="papers"
      >
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3.5">
              <span className="w-11 h-11 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-orange-500 shadow-sm">
                <FileText className="w-[22px] h-[22px]" />
              </span>
              <div>
                <div className="text-[11px] text-orange-600 tracking-[0.2em] uppercase font-bold mb-0.5">
                  Papers in this series
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Read the research</h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              href="/research/the-invisible-infrastructure"
              className="group flex flex-col bg-white border border-slate-100 rounded-2xl p-7 min-h-[220px] shadow-sm transition-all duration-300 hover:border-orange-500 hover:-translate-y-1 hover:shadow-[0_1px_3px_rgba(15,23,42,0.04),0_16px_32px_rgba(15,23,42,0.06),0_4px_12px_rgba(255,107,53,0.10)]"
            >
              <div className="flex justify-between items-center mb-5">
                <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em]">
                  PAPER 01
                </span>
                <span className="text-[28px] font-bold text-slate-300 tracking-[-0.04em] leading-[0.85]">
                  01
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-[-0.015em] leading-snug mb-2">
                The Invisible Infrastructure
              </h3>
              <div className="text-sm text-slate-700 leading-relaxed flex-1 mb-4">
                Why Regulatory Knowledge Shapes the World We Build
              </div>
              <div className="flex justify-between items-center pt-3.5 border-t border-slate-100 text-xs text-slate-500">
                <span>April 22, 2026</span>
                <span className="inline-flex items-center gap-1.5 text-orange-600 font-semibold transition-all group-hover:gap-3">
                  Read
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            <div className="flex flex-col bg-slate-100/60 border border-dashed border-slate-200 rounded-2xl p-7 min-h-[220px] opacity-85">
              <div className="flex justify-between items-center mb-5">
                <span className="bg-white text-slate-500 border border-slate-200 px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em]">
                  COMING SOON
                </span>
                <span className="text-[28px] font-bold text-slate-200 tracking-[-0.04em] leading-[0.85]">
                  02
                </span>
              </div>
              <h3 className="text-xl font-bold tracking-[-0.015em] leading-snug mb-2 text-slate-500">
                The next paper in the series
              </h3>
              <div className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
                The next paper explores how building codes and standards evolve through collective
                expertise and shared knowledge.
              </div>
              <div className="flex justify-between items-center pt-3.5 border-t border-slate-100 text-xs text-slate-500">
                <span>In progress</span>
                <span className="text-slate-300">—</span>
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
        </Container>
      </section>
    </>
  );
}
