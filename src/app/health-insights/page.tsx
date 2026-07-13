"use client";
import React from "react";
import Image from "next/image";
import { TrendingUp, BarChart3, LineChart, FileText, ArrowRight, ShieldCheck } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import GradientButton from "@/components/common/GradientButton";
import ScrollReveal from "@/components/common/ScrollReveal";
import MetricChart from "@/components/charts/MetricChart";

export default function HealthInsightsPage() {
  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Health Analytics
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            Personal Health Trends &amp; Insights
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Correlate historical lab findings. Spot metric improvements and understand diagnostic changes over time.
          </p>
        </div>

        {/* Dynamic Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <MetricChart type="hemoglobin" />
          <MetricChart type="glucose" />
          <MetricChart type="cholesterol" />
        </div>

        {/* Dashboard Concept Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <ScrollReveal direction="right" className="space-y-6">
            <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Trend Modeling</span>
            <h3 className="text-3xl font-bold text-deep-blue leading-tight">
              Compare Multiple Reports Seamlessly
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              HealthLens aligns parameters from test documents over years or months. Monitor whether lifestyle or treatment adjustments are showing positive results.
            </p>

            <div className="space-y-4">
              {[
                { title: "Continuous Visual Timeline", desc: "Every uploaded metric plotted automatically.", icon: <LineChart size={16} /> },
                { title: "Relative Difference Calculations", desc: "See absolute values drop or rise between diagnostics.", icon: <TrendingUp size={16} /> },
                { title: "Automatic Unit Conversion", desc: "Translates varying lab unit measurements to standard grids.", icon: <BarChart3 size={16} /> },
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
                src="/images/generated/health_trends_illustration.png"
                alt="Health Insights illustration"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Secure Cloud Shield Box */}
        <ScrollReveal className="max-w-4xl mx-auto rounded-[32px] border border-border-pale bg-white p-8 sm:p-10 shadow-premium flex flex-col md:flex-row items-center gap-6 mt-16">
          <div className="p-4 bg-emerald-50 text-emerald-500 rounded-2xl">
            <ShieldCheck size={36} />
          </div>
          <div>
            <h4 className="font-bold text-deep-blue text-base sm:text-lg mb-1">Your Historical Records are Fully Encrypted</h4>
            <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
              We encrypt metrics both in transit and storage using industry standards. Only you hold the decryption keys. No health figures are public or indexed by search providers.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
