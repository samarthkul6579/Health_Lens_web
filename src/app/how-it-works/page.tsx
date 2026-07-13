"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Upload, Cpu, Sparkles, FileText, TrendingUp, ArrowRight, Play } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import GradientButton from "@/components/common/GradientButton";
import ScrollReveal from "@/components/common/ScrollReveal";

const steps = [
  {
    step: "Step 01",
    title: "Upload Report Documents",
    desc: "Drop your PDF, lab reports, or take a picture of a physical medical printout using your smartphone camera. We support typical clinical files including CBC, lipid panel, thyroid panel, and glucose logs.",
    icon: <Upload size={22} />,
    image: "/images/generated/report_analysis_illustration.png",
  },
  {
    step: "Step 02",
    title: "AI Extracts Medical Data",
    desc: "Our secure optical character recognition (OCR) scanning engine extracts each parameter, quantitative value, unit, and laboratory-specific reference ranges from the document layout.",
    icon: <Cpu size={22} />,
    image: "/images/generated/secure_storage_illustration.png",
  },
  {
    step: "Step 03",
    title: "AI Generates Insights",
    desc: "Advanced natural language processing translates medical jargon, highlights markers that lie outside reference thresholds, and identifies links between values.",
    icon: <Sparkles size={22} />,
    image: "/images/generated/ai_assistant_illustration.png",
  },
  {
    step: "Step 04",
    title: "Review Simplified Summary",
    desc: "Read a plain-language summary of your overall report, look up metric definitions, and access a list of doctor-ready questions tailored to discuss during your next checkup.",
    icon: <FileText size={22} />,
    image: "/images/generated/doctor_prep_illustration.png",
  },
  {
    step: "Step 05",
    title: "Compare and Track Health Over Time",
    desc: "Watch your parameters graph out. When you upload future test reports, HealthLens automatically maps them to your personal health timeline to show you if metrics are improving.",
    icon: <TrendingUp size={22} />,
    image: "/images/generated/health_trends_illustration.png",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Platform Journey
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            Understand the Platform Flow
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            See how HealthLens takes the complexity out of medical reports and provides clear, actionable health dashboards.
          </p>
        </div>

        {/* Alternating Steps Timeline */}
        <div className="space-y-24 max-w-5xl mx-auto relative">
          {/* Vertical joining line inside background */}
          <div className="absolute top-8 bottom-8 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-border-pale/80 hidden md:block" />

          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <ScrollReveal
                key={step.step}
                direction={isEven ? "right" : "left"}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline center node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-4 border-white bg-primary-blue text-white shadow-premium flex items-center justify-center font-bold text-xs z-20 hidden md:flex">
                  {idx + 1}
                </div>

                {/* Left/Right Text Content */}
                <div className={`space-y-4 ${isEven ? "md:text-right pl-12 md:pl-0 md:pr-12" : "pl-12 md:pl-12 md:text-left"}`}>
                  <span className="text-xs font-bold text-primary-blue bg-primary-blue/10 px-3 py-1 rounded-full border border-primary-blue/10 uppercase tracking-widest">
                    {step.step}
                  </span>
                  <h3 className="text-2xl font-bold text-deep-blue mt-2">{step.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* Left/Right Illustration */}
                <div className={`flex ${isEven ? "md:justify-start" : "md:justify-end"} justify-center pl-12 md:pl-0`}>
                  <div className="relative w-full max-w-[400px] aspect-video rounded-3xl overflow-hidden bg-white border border-border-pale shadow-premium group">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Interactive Play Video CTA */}
        <ScrollReveal className="max-w-3xl mx-auto mt-28 bg-white border border-border-pale p-8 rounded-[28px] text-center shadow-premium-lg">
          <h3 className="text-xl font-bold text-deep-blue mb-3">Watch Our 1-Minute Walkthrough</h3>
          <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xl mx-auto">
            See a live demo of uploading a CBC report and interacting with the HealthLens mobile application interface.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/coming-soon"
              className="flex items-center gap-2 bg-deep-blue hover:bg-primary-blue text-white text-sm font-semibold px-6 py-3 rounded-full shadow-premium transition-all duration-200"
            >
              <Play size={16} className="fill-white" />
              Watch Demo Video
            </Link>
            <GradientButton href="/coming-soon">Get Started Now</GradientButton>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
