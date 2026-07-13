"use client";
import React from "react";
import Image from "next/image";
import { Heart, Target, Compass, Brain, Code2, Milestone } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function AboutPage() {
  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            Empowering Health Literacy
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            We believe that understanding your medical data is the first step toward living a healthier, more confident life.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto">
          <ScrollReveal direction="right" className="bg-white rounded-3xl border border-border-pale p-8 shadow-premium hover:shadow-premium-xl transition-all duration-300 space-y-4">
            <div className="p-3 bg-primary-blue/10 text-primary-blue rounded-2xl w-fit">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-deep-blue">Our Mission</h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              To build secure, accessible AI-powered companions that translate complex health documents into plain language, helping people make informed choices in partnership with their doctors.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="left" className="bg-white rounded-3xl border border-border-pale p-8 shadow-premium hover:shadow-premium-xl transition-all duration-300 space-y-4">
            <div className="p-3 bg-health-green/10 text-health-green rounded-2xl w-fit">
              <Compass size={24} />
            </div>
            <h3 className="text-xl font-bold text-deep-blue">Our Vision</h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              A world where health records are not just lines of raw numbers, but clear guides that inspire people to monitor their metrics and work collaboratively with healthcare providers.
            </p>
          </ScrollReveal>
        </div>

        {/* Technology & Team Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Platform Core</span>
            <h2 className="text-3xl font-bold text-deep-blue leading-tight">
              Science and Engineering Combined
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Our software combines optical character recognition (OCR) and custom clinical NLP models to accurately identify laboratory reference fields and contextual metrics.
            </p>

            <div className="space-y-4.5">
              {[
                { title: "Clinical Range Mapping", desc: "Correlates metric entries with standard physiological thresholds.", icon: <Brain size={18} /> },
                { title: "Privacy-Preserving Tech", desc: "Secures user files with AES-256 cloud folders.", icon: <Code2 size={18} /> },
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
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-square rounded-[28px] overflow-hidden shadow-premium-xl border border-border-pale">
              <Image
                src="/images/generated/hero_dashboard_mockup.png"
                alt="HealthLens application layouts"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Future Roadmap Timeline */}
        <div className="max-w-3xl mx-auto mb-16">
          <SectionHeading
            label="Product Evolution"
            title="Future Roadmap"
            description="Our ongoing plans to build the most comprehensive personal health intelligence companion."
            align="center"
          />

          <div className="relative border-l-2 border-border-pale/80 pl-8 ml-4 sm:ml-8 space-y-10">
            {[
              { phase: "Phase 1 - In Beta", title: "PDF Report Extraction", desc: "OCR Scanning, blood metric extraction, and plain language translations." },
              { phase: "Phase 2 - Q3 2026", title: "Historical Metric Analysis", desc: "Long-term trend lines plotting glucose, lipid profiles, and iron values side-by-side." },
              { phase: "Phase 3 - Q4 2026", title: "Family Sharing Hub", desc: "Adding isolated accounts for kids and senior dependents with individual timelines." },
              { phase: "Phase 4 - Q1 2027", title: "Voice Conversational Companion", desc: "Talk directly to your health records and receive vocal explanations." },
            ].map((milestone, idx) => (
              <ScrollReveal key={idx} direction="up" className="relative group">
                <div className="absolute -left-[45px] top-0.5 w-8 h-8 rounded-full border-2 border-primary-blue bg-white flex items-center justify-center text-primary-blue font-bold text-xs">
                  {idx + 1}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary-blue uppercase tracking-widest">
                    {milestone.phase}
                  </span>
                  <h4 className="text-lg font-bold text-deep-blue mt-1">{milestone.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed mt-1">{milestone.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
