import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ArrowRight, BookOpen, Calendar, FileText } from "lucide-react";
import type { ReactElement } from "react";

export const metadata = {
  title: "Research",
  description: "White papers on regulatory intelligence infrastructure for the built environment.",
};

export default function ResearchPage(): ReactElement {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
        {/* Soft orange + blue glows */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 0%, rgba(255,107,53,0.10), transparent 60%), radial-gradient(ellipse 70% 50% at 80% 30%, rgba(0,119,182,0.06), transparent 60%)",
          }}
        />
        <Container className="relative py-20 sm:py-24">
          <div className="inline-flex items-center gap-2.5 mb-10 text-[11px] uppercase tracking-[0.25em] font-semibold text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            <span>
              <strong className="text-slate-900 font-bold">Athyna</strong> · Research
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-end">
            <div className="flex items-start gap-3 sm:gap-4">
              <h1 className="text-[clamp(56px,9vw,132px)] font-bold tracking-[-0.045em] leading-[0.92] text-slate-900">
                Research
              </h1>
              <span className="text-[clamp(20px,2.2vw,32px)] text-orange-500 font-medium pt-2 sm:pt-3 lg:pt-4 leading-none">
                01
              </span>
            </div>
            <p className="text-lg lg:text-[19px] leading-relaxed text-slate-700 max-w-md">
              White papers on{" "}
              <strong className="text-slate-900 font-semibold">regulatory intelligence infrastructure</strong>{" "}
              for the built environment.
            </p>
          </div>
        </Container>
      </section>

      {/* CARDS */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          {/* Intro card */}
          <Link
            href="/research/introduction"
            className="group relative grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] mb-7 bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-orange-500 hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,107,53,0.08),0_8px_24px_rgba(15,23,42,0.06),0_28px_64px_rgba(255,107,53,0.10)]"
          >
            <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-between gap-6 min-h-[260px] lg:min-h-[360px]">
              <div>
                <span className="inline-flex items-center gap-2.5 mb-6 px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold tracking-[0.05em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  Series Introduction
                </span>
                <h2 className="text-[clamp(30px,3.6vw,44px)] font-bold tracking-[-0.025em] leading-[1.05] text-slate-900 mb-4">
                  Reimagining Regulation as Intelligent Infrastructure.
                </h2>
                <p className="text-[17px] text-slate-700 leading-relaxed max-w-xl">
                  A new foundation for safer, faster, and more resilient built environments.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-7 border-t border-slate-100 text-[13px] text-slate-500">
                <span>
                  By <strong className="text-slate-900 font-semibold">Maple Rose Furigay, PMP®</strong> · April 22, 2026
                </span>
                <span className="inline-flex items-center gap-1.5 text-orange-600 font-semibold transition-all group-hover:gap-3">
                  Read introduction
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div
              className="relative min-h-[140px] sm:min-h-[260px] lg:min-h-[360px] flex items-center justify-center py-5 sm:py-10 lg:py-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(255,107,53,0.18), transparent 60%), radial-gradient(ellipse 50% 70% at 30% 70%, rgba(0,119,182,0.08), transparent 60%), linear-gradient(135deg, #F8FAFC, #FFFFFF)",
              }}
            >
              {/* faint grid */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="relative z-[2] flex flex-col items-center gap-2 sm:gap-4">
                <div
                  className="w-14 h-14 sm:w-24 sm:h-24 lg:w-[132px] lg:h-[132px] rounded-xl sm:rounded-[20px] lg:rounded-[28px] bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-2"
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.25), 0 24px 48px rgba(255,107,53,0.32), 0 4px 12px rgba(15,23,42,0.06)",
                  }}
                >
                  <BookOpen className="w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14" strokeWidth={1.5} />
                </div>
                <div className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-slate-500">
                  <strong className="text-slate-900">Series</strong> · Introduction
                </div>
              </div>
            </div>
          </Link>

          {/* Paper cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Paper 01 */}
            <Link
              href="/research/the-invisible-infrastructure"
              className="group relative flex flex-col bg-white border border-slate-100 rounded-2xl p-10 min-h-[380px] shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:border-orange-500 hover:-translate-y-1 hover:shadow-[0_1px_0_rgba(255,107,53,0.08),0_8px_24px_rgba(15,23,42,0.06),0_24px_56px_rgba(255,107,53,0.10)] overflow-hidden"
            >
              {/* glow */}
              <div
                aria-hidden
                className="absolute -top-1/2 -right-[30%] w-[80%] aspect-square pointer-events-none"
                style={{
                  background: "radial-gradient(closest-side, rgba(255,107,53,0.08), transparent 70%)",
                  filter: "blur(40px)",
                }}
              />
              <div className="relative z-[2] flex justify-between items-start mb-7">
                <span className="bg-slate-900 text-white px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.1em]">
                  PAPER 01
                </span>
                <span className="text-4xl font-bold text-slate-300 tracking-[-0.04em] leading-none">01</span>
              </div>
              <h3 className="relative z-[2] text-[26px] font-bold tracking-[-0.02em] leading-[1.1] text-slate-900 mb-3">
                The Invisible Infrastructure
              </h3>
              <div className="relative z-[2] text-[15px] text-slate-700 leading-relaxed mb-5">
                Why Regulatory Knowledge Shapes the World We Build
              </div>
              <div className="relative z-[2] text-sm leading-relaxed text-slate-700 bg-slate-50 rounded-xl p-4 mb-6 flex-1">
                Regulatory systems function as invisible infrastructure shaping the built environment.
              </div>
              <div className="relative z-[2] flex justify-between items-center pt-5 border-t border-slate-100 text-[13px] text-slate-500">
                <span>
                  By <strong className="text-slate-900 font-semibold">Maple Rose Furigay, PMP®</strong>
                </span>
                <span className="inline-flex items-center gap-1.5 text-orange-600 font-semibold transition-all group-hover:gap-3">
                  Read
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Coming soon */}
            <div className="relative flex flex-col bg-white border border-dashed border-slate-200 rounded-2xl p-10 min-h-[380px] opacity-90">
              <div className="flex justify-between items-start mb-7">
                <span className="bg-slate-100 text-slate-500 px-4 py-2 rounded-full text-[11px] font-semibold tracking-[0.1em]">
                  COMING SOON
                </span>
                <span className="text-4xl font-bold text-slate-200 tracking-[-0.04em] leading-none">02</span>
              </div>
              <h3 className="text-[26px] font-bold tracking-[-0.02em] leading-[1.1] text-slate-500 mb-3">
                The next paper in the series
              </h3>
              <div className="text-[15px] text-slate-500 leading-relaxed mb-5">Title forthcoming</div>
              <div className="text-sm leading-relaxed text-slate-500 bg-slate-50 rounded-xl p-4 mb-6 flex-1">
                How building codes and standards evolve through collective expertise and shared knowledge.
              </div>
              <div className="flex justify-between items-center pt-5 border-t border-slate-100 text-[13px] text-slate-500">
                <span>
                  By <strong className="text-slate-700 font-semibold">Maple Rose Furigay, PMP®</strong>
                </span>
                <span>In progress</span>
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
            Step Into the Future of <em className="not-italic text-orange-500 italic font-medium">Compliance</em>.
          </h3>
          <p className="text-[17px] text-white/65 leading-relaxed mb-8 max-w-[540px] mx-auto">
            Reserve your spot for early access to trusted, next-generation AI for the built environment.
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
