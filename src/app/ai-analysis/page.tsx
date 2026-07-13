"use client";
import React from "react";
import Image from "next/image";
import { Cpu, FileText, Brain, ShieldAlert, Sparkles, TrendingUp, HelpCircle } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import GradientButton from "@/components/common/GradientButton";
import ScrollReveal from "@/components/common/ScrollReveal";
import ReportDemo from "@/components/ui/ReportDemo";

const techBlocks = [
  {
    icon: <FileText size={20} />,
    title: "1. Raw Document Upload",
    desc: "Ingests images (JPEG, PNG) or document formats (PDF). Supports varying resolutions, patient folder scans, or lab outputs.",
  },
  {
    icon: <Cpu size={20} />,
    title: "2. Intelligent OCR Layout Mapping",
    desc: "Extracts textual contents. Maps column configurations, isolating parameters, numeric results, reference intervals, and unit labels.",
  },
  {
    icon: <Brain size={20} />,
    title: "3. Clinical Value Parsing",
    desc: "Cross-checks numeric parameters against standard physiological metrics. Identifies values falling below or above standard reference ranges.",
  },
  {
    icon: <Sparkles size={20} />,
    title: "4. Insight Generation",
    desc: "Translates abbreviations, compiles simple textual summaries, flags trends, and generates actionable, doctor-ready inquiries.",
  },
];

export default function AIAnalysisPage() {
  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Analysis Engine
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            AI Report Analysis Engine
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Discover the technology converting complex medical terminology and numeric variables into plain, clear summaries.
          </p>
        </div>

        {/* Demo Section */}
        <div className="mb-24">
          <ScrollReveal>
            <ReportDemo />
          </ScrollReveal>
        </div>

        {/* Step-by-Step Tech Breakdown */}
        <div className="mb-24">
          <SectionHeading
            label="Under the Hood"
            title="The HealthLens Scanning Pipeline"
            description="How our architecture safely ingests, reads, and analyzes diagnostic reports."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techBlocks.map((block, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 0.05}
                className="bg-white rounded-2xl border border-border-pale p-6 shadow-premium space-y-4 hover:shadow-premium-lg transition-all duration-300"
              >
                <div className="p-2.5 bg-primary-blue/10 text-primary-blue rounded-xl w-fit">
                  {block.icon}
                </div>
                <h4 className="font-bold text-deep-blue text-sm sm:text-base">{block.title}</h4>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{block.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Analytical Output Cards Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollReveal direction="right" className="space-y-6">
            <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Actionable Reports</span>
            <h3 className="text-3xl font-bold text-deep-blue leading-tight">
              Get Value Beyond Simple Raw Numbers
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              HealthLens translates lab parameters so you understand the physiological implications, highlighting relative changes and drafting customized appointment checklists.
            </p>

            <div className="space-y-4">
              {[
                { title: "Simplified Summaries", desc: "Understand your report in seconds.", icon: <Brain size={16} /> },
                { title: "Out-of-Range Highlights", desc: "Never miss out-of-range thresholds.", icon: <ShieldAlert size={16} /> },
                { title: "Historical Comparisons", desc: "Correlate previous and current test figures.", icon: <TrendingUp size={16} /> },
                { title: "Smart Consultation Prep", desc: "Receive questions customized for your doctor.", icon: <HelpCircle size={16} /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-left">
                  <div className="p-2 bg-white border border-border-pale rounded-lg text-primary-blue shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-blue text-xs sm:text-sm">{item.title}</h4>
                    <p className="text-text-secondary text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" className="flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-square rounded-[28px] overflow-hidden shadow-premium-xl border border-border-pale">
              <Image
                src="/images/generated/report_analysis_illustration.png"
                alt="AI Analysis illustration mockups"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Closing CTA */}
        <div className="text-center mt-20">
          <GradientButton href="/coming-soon">Test Your Own Report</GradientButton>
        </div>
      </Container>
    </div>
  );
}
