"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  History,
  Lock,
  ShieldCheck,
  TrendingUp,
  Users,
  AlertTriangle,
  UserCheck,
  Plus,
  PhoneCall,
  Calendar,
  Sparkles,
  Info,
  Upload,
} from "lucide-react";

import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import GradientButton from "@/components/common/GradientButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import ScrollReveal from "@/components/common/ScrollReveal";
import { cn } from "@/lib/utils";

import AppMockup from "@/components/ui/AppMockup";
import HealthMetricCard from "@/components/ui/HealthMetricCard";
import FAQAccordion from "@/components/ui/FAQAccordion";
import SecurityBadge from "@/components/ui/SecurityBadge";
import PhoneFrame from "@/components/ui/PhoneFrame";
import MetricChart from "@/components/charts/MetricChart";
import ReportDemo from "@/components/ui/ReportDemo";
import AICopilotChat from "@/components/ui/AICopilotChat";

// FAQ List (8 standard questions)
const homepageFAQs = [
  {
    question: "What types of reports can I upload?",
    answer: "You can upload any PDF or image format of standard blood panels, lipid profiles, metabolic charts, urine tests, thyroid panels, and general health summaries.",
  },
  {
    question: "Does HealthLens provide a medical diagnosis?",
    answer: "No. HealthLens is designed for educational and informational purposes only. It translates complex language, points out values outside reference ranges, and organizes history, but it does not diagnose illnesses or replace professional medical advice.",
  },
  {
    question: "Is my report data private and secure?",
    answer: "Absolutely. We employ enterprise-grade AES-256 encryption. Only you hold the keys to view or share your reports. You can delete your data permanently at any time.",
  },
  {
    question: "Can I delete my uploaded reports?",
    answer: "Yes, deletion is 100% user-controlled. When you delete a report, it is permanently wiped from our secure storage servers immediately and cannot be recovered.",
  },
  {
    question: "Can I compare multiple reports over time?",
    answer: "Yes! Our comparison engine aligns historical lab metrics (such as Hemoglobin or Cholesterol) side-by-side and plots visual trends to help you monitor improvements.",
  },
  {
    question: "Can I manage reports for my family members?",
    answer: "Yes. HealthLens allows you to add secure, isolated profiles for spouses, children, or elderly parents, maintaining separate timelines and document libraries.",
  },
  {
    question: "Does the AI replacement a doctor?",
    answer: "No. HealthLens prepares you to have more productive conversations with your doctor by highlighting out-of-range values and generating questions to discuss during your appointments.",
  },
  {
    question: "When will the mobile app be available?",
    answer: "Our mobile application is currently in closed beta. Join our Early Access list on this page to receive an exclusive invitation as soon as we open registration.",
  },
];

export default function Home() {
  // Before & After States
  const [beforeTab, setBeforeTab] = useState<"before" | "after">("before");

  // Family switcher states
  const [familyProfile, setFamilyProfile] = useState<"self" | "parent" | "child">("self");

  // Medication checklist state
  const [meds, setMeds] = useState([
    { id: 1, name: "Vitamin D3", time: "09:00 AM", taken: true },
    { id: 2, name: "Omega 3 Capsule", time: "02:00 PM", taken: false },
    { id: 3, name: "Iron Supplement", time: "08:00 PM", taken: false },
  ]);

  const toggleMed = (id: number) => {
    setMeds(meds.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)));
  };

  return (
    <div className="mesh-gradient-bg min-h-screen relative overflow-hidden flex flex-col w-full">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none z-0" />

      {/* Floating premium blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square rounded-full bg-gradient-to-tr from-primary-blue/15 to-accent-cyan/5 blur-3xl opacity-60 pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute top-[20%] right-[-10%] w-[45%] aspect-square rounded-full bg-gradient-to-bl from-health-green/10 to-primary-blue/5 blur-3xl opacity-50 pointer-events-none z-0 animate-float" />
      <div className="absolute bottom-[20%] left-[-5%] w-[40%] aspect-square rounded-full bg-gradient-to-tr from-accent-cyan/10 to-primary-blue/10 blur-3xl opacity-40 pointer-events-none z-0 animate-float-delayed" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <ScrollReveal direction="down" delay={0.1}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10">
                  <Sparkles size={12} className="animate-spin duration-3000" />
                  AI Health Intelligence Platform
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.2}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-deep-blue leading-tight">
                  Understand Your <br />
                  <span className="text-gradient">Medical Reports</span> with AI
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.3}>
                <p className="text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Upload your medical reports and get clear summaries, key findings, health trends, and useful questions to discuss with your doctor.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <GradientButton href="/coming-soon" icon={<ArrowRight size={16} />}>
                  Get Early Access
                </GradientButton>
                <SecondaryButton href="/how-it-works">See How It Works</SecondaryButton>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={0.5} className="flex items-center justify-center lg:justify-start gap-2.5 text-xs text-text-secondary">
                <ShieldCheck size={16} className="text-health-green" />
                <span>Your reports stay private, fully encrypted, and secure.</span>
              </ScrollReveal>
            </div>

            {/* Right Graphic Mockup */}
            <div className="lg:col-span-5 relative">
              <ScrollReveal direction="left" delay={0.3}>
                <AppMockup />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUST STRIP */}
      {/* ========================================================================= */}
      <section className="py-10 bg-white border-y border-border-pale/80 overflow-hidden relative z-10">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-stretch items-center">
            {[
              { title: "AI-Powered Explanations", desc: "No complex medical jargon", icon: <Brain size={18} /> },
              { title: "Secure Report Storage", desc: "Full end-to-end encryption", icon: <Lock size={18} /> },
              { title: "Personalized Health Trends", desc: "Compare historical metrics", icon: <TrendingUp size={18} /> },
              { title: "Doctor-Ready Insights", desc: "Prepare high-value questions", icon: <CheckCircle2 size={18} /> },
            ].map((pillar, i) => (
              <div key={i} className="flex items-center gap-3.5 text-left group w-full p-4 sm:p-0 rounded-2xl hover:bg-bg-pale/50 sm:hover:bg-transparent transition-colors duration-200">
                <div className="p-2.5 rounded-xl bg-bg-pale text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all duration-300 shrink-0">
                  {pillar.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-deep-blue group-hover:text-primary-blue transition-colors duration-200">{pillar.title}</h4>
                  <p className="text-xs text-text-secondary mt-0.5">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. PROBLEM & SOLUTION SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-gradient-to-b from-white to-bg-pale">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy: Problem */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-bold text-red-500 uppercase tracking-widest">The Health Info Gap</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue leading-tight">
                Medical reports are difficult to understand.
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                Standard patient portals provide lines of raw numbers, scientific abbreviations, and confusing reference ranges, leaving you with unanswered questions and anxiety.
              </p>
              <div className="space-y-4">
                {[
                  "Complex Latin and Greek medical terminology.",
                  "Files scattered across email attachments and portal logins.",
                  "No historical context showing if values are improving.",
                  "Uncertainty about what to ask your physician.",
                ].map((prob, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                    <span>{prob}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Tabbed Graphic: Before vs After */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="left">
                <div className="rounded-[28px] border border-border-pale bg-white shadow-premium p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center border-b border-border-pale/60 pb-4">
                    <h3 className="font-extrabold text-deep-blue text-sm sm:text-base">Report Transformation</h3>
                    <div className="flex bg-bg-pale p-1 rounded-full border border-border-pale">
                      <button
                        onClick={() => setBeforeTab("before")}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          beforeTab === "before" ? "bg-white text-red-500 shadow-sm" : "text-text-secondary"
                        }`}
                      >
                        Before HealthLens
                      </button>
                      <button
                        onClick={() => setBeforeTab("after")}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          beforeTab === "after" ? "bg-white text-primary-blue shadow-sm" : "text-text-secondary"
                        }`}
                      >
                        After HealthLens
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {beforeTab === "before" ? (
                      <motion.div
                        key="before"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 font-mono text-[10px] sm:text-xs text-zinc-600 leading-relaxed overflow-x-auto"
                      >
                        <p className="font-bold border-b border-zinc-200 pb-2 mb-2 text-zinc-800">
                          LAB RESULTS - CBC WITH DIFF
                        </p>
                        <p>PATIENT: JANE DOE | DATE: 07/10/2026</p>
                        <div className="grid grid-cols-4 gap-2 mt-4 font-bold border-b border-zinc-200 pb-1">
                          <span>TEST</span>
                          <span>RESULT</span>
                          <span>FLAG</span>
                          <span className="text-right">REFERENCE</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          <span>WBC</span>
                          <span>6.5 K/uL</span>
                          <span className="text-zinc-400">Normal</span>
                          <span className="text-right">4.5-11.0</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-1">
                          <span className="text-red-500 font-bold">HGB</span>
                          <span className="text-red-500 font-bold">11.5 g/dL</span>
                          <span className="text-red-500 font-bold">Low (L)</span>
                          <span className="text-right">12.0-16.0</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-1">
                          <span>RBC</span>
                          <span>4.2 M/uL</span>
                          <span className="text-zinc-400">Normal</span>
                          <span className="text-right">4.0-5.2</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-1">
                          <span>PLT</span>
                          <span>250 K/uL</span>
                          <span className="text-zinc-400">Normal</span>
                          <span className="text-right">150-450</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="after"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4"
                      >
                        {/* Summary Header */}
                        <div className="p-4 rounded-xl bg-primary-blue/5 border border-primary-blue/10 flex items-start gap-3">
                          <Brain size={18} className="text-primary-blue shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-extrabold text-xs text-primary-blue uppercase tracking-wider">
                              AI Summary
                            </h4>
                            <p className="text-xs text-deep-blue mt-1 leading-relaxed">
                              Your hemoglobin value is mildly low, which may lead to occasional fatigue. All other markers are in the ideal ranges.
                            </p>
                          </div>
                        </div>

                        {/* Focus Metric Card */}
                        <div className="p-4.5 rounded-xl border border-red-100 bg-red-50/50 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                            <div>
                              <h5 className="font-bold text-xs text-deep-blue">Hemoglobin</h5>
                              <p className="text-[10px] text-text-secondary">CBC Blood Test</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-extrabold text-red-500">11.5 g/dL</span>
                            <p className="text-[9px] text-text-secondary">Goal: 12.0 - 16.0</p>
                          </div>
                        </div>

                        {/* Quick Action */}
                        <div className="p-3 bg-bg-pale rounded-xl flex items-center justify-between text-xs">
                          <span className="font-semibold text-deep-blue">Generated questions for your doctor:</span>
                          <span className="text-primary-blue font-bold flex items-center gap-0.5">
                            View 3 Questions <ChevronRight size={14} />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-white">
        <Container>
          <SectionHeading
            label="Seamless Process"
            title="How HealthLens Works"
            description="Our advanced health document platform simplifies medical data in four simple steps."
          />

          <div className="relative border-l-2 border-border-pale/80 pl-8 ml-4 sm:ml-8 max-w-2xl mx-auto space-y-12">
            {[
              {
                step: "01",
                title: "Upload Your Reports",
                desc: "Simply drop your lab results PDF or snap a photo of a physical printout directly using the mobile app or browser.",
                icon: <Upload size={18} />,
              },
              {
                step: "02",
                title: "AI Analysis & Structuring",
                desc: "HealthLens extracts the text using secure OCR, maps each metric against reference standard ranges, and structures history.",
                icon: <Brain size={18} />,
              },
              {
                step: "03",
                title: "Get Clear Explanations",
                desc: "Receive a simple, plain-language breakdown of key values, anomalies, and what they mean for your overall health.",
                icon: <CheckCircle2 size={18} />,
              },
              {
                step: "04",
                title: "Track Over Time & Prepare",
                desc: "Monitor your historical numbers over months or years, and review a custom list of intelligent questions to discuss with your doctor.",
                icon: <TrendingUp size={18} />,
              },
            ].map((item, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.1} className="relative group">
                {/* Timeline circle */}
                <div className="absolute -left-[45px] top-0.5 w-8 h-8 rounded-full border-2 border-primary-blue bg-white flex items-center justify-center text-primary-blue font-bold text-xs group-hover:bg-primary-blue group-hover:text-white transition-all duration-300">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-deep-blue mb-2 flex items-center gap-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. APP FEATURE SHOWCASE (ALTERNATING GRID) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-bg-pale/50" id="features">
        <Container>
          <SectionHeading
            label="Features Tour"
            title="Premium Health Dashboard Capabilities"
            description="Explore the tools engineered to put you in complete command of your medical record timeline."
          />

          <div className="space-y-24">
            {/* Feature 1: AI Report Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col gap-5">
                <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Medical Translation</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-deep-blue">AI Report Analysis</h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  HealthLens translates scientific medical nomenclature and abbreviations into clear summaries.
                </p>
                <ul className="space-y-2.5 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Converts dense medical terminology to clear text.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Highlights abnormal values instantly.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Presents visual risk dashboards.</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-7 flex justify-center">
                <Image
                  src="/images/generated/report_analysis_illustration.png"
                  alt="AI Report Analysis Screen Mockup"
                  width={420}
                  height={320}
                  className="rounded-3xl border border-border-pale shadow-premium"
                />
              </div>
            </div>

            {/* Feature 2: Report Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:flex-row-reverse">
              <div className="lg:col-span-5 lg:order-2 flex flex-col gap-5">
                <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Historical View</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-deep-blue">Report Comparison</h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  Easily review the evolution of key metrics side-by-side. Spot shifts between previous and current values.
                </p>
                <ul className="space-y-2.5 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Compare columns from multiple diagnostic dates.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Identify patterns in metrics like glucose or white cells.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Track progress with relative indicators (+/-).</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-7 lg:order-1 flex justify-center">
                <Image
                  src="/images/generated/health_trends_illustration.png"
                  alt="Report Comparison Dashboard illustration"
                  width={420}
                  height={320}
                  className="rounded-3xl border border-border-pale shadow-premium"
                />
              </div>
            </div>

            {/* Feature 3: AI Copilot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col gap-5">
                <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Smart Assistant</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-deep-blue">AI Health Copilot</h3>
                <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                  Interact with a context-aware chat assistant that references your uploaded health records.
                </p>
                <ul className="space-y-2.5 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Ask direct questions about specific metrics.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Receive answers cited from your uploads.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-health-green" />
                    <span>Fully formatted layout, simple and clear.</span>
                  </li>
                </ul>
              </div>
              <div className="lg:col-span-7 flex justify-center">
                <Image
                  src="/images/generated/ai_assistant_illustration.png"
                  alt="AI Assistant Mockup Illustration"
                  width={420}
                  height={320}
                  className="rounded-3xl border border-border-pale shadow-premium"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 6. INTERACTIVE REPORT ANALYSIS DEMO */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-white">
        <Container>
          <SectionHeading
            label="Try It Now"
            title="Interactive Demo Panel"
            description="Select a sample medical report to see how the HealthLens platform parses values and lists findings."
          />
          <ReportDemo />
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 7. HEALTH INSIGHTS SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-bg-pale/40">
        <Container>
          <SectionHeading
            label="Visual Analytics"
            title="Animate Historical Lab Metrics"
            description="Toggle and filter charts mapping parameters like sugar, lipid ratios, and iron levels over time."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MetricChart type="hemoglobin" />
            <MetricChart type="glucose" />
            <MetricChart type="cholesterol" />
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 8. AI COPILOT SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Medical Assistant</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue leading-tight">
                Your Context-Aware AI Health Companion
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                Ask specific questions regarding values in your database. Our copilot understands standard laboratory reference ranges and answers securely.
              </p>
              <div className="flex flex-col gap-4 text-sm text-text-secondary">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-health-green shrink-0 mt-0.5" />
                  <span>References specific lab results in replies.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-health-green shrink-0 mt-0.5" />
                  <span>Drafts lists of items to discuss with your doctor.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-health-green shrink-0 mt-0.5" />
                  <span>Adheres to strict safety protocols with clear disclaimers.</span>
                </div>
              </div>
            </div>

            {/* Right Chat UI */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="left">
                <AICopilotChat />
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 9. FAMILY HEALTH MANAGEMENT */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-gradient-to-b from-white to-bg-pale">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Graphics Switcher */}
            <div className="lg:col-span-6 lg:order-2">
              <ScrollReveal direction="left">
                <div className="rounded-[28px] border border-border-pale bg-white shadow-premium p-6 sm:p-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-deep-blue text-sm">Family Profiles Hub</h4>
                    <div className="flex gap-1.5 p-1 bg-bg-pale rounded-full border border-border-pale">
                      {([
                        { id: "self", name: "Jane (Self)" },
                        { id: "parent", name: "Robert (Father)" },
                        { id: "child", name: "Leo (Son)" },
                      ] as const).map((profile) => (
                        <button
                          key={profile.id}
                          onClick={() => setFamilyProfile(profile.id)}
                          className={cn(
                            "px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer",
                            familyProfile === profile.id
                              ? "bg-white text-primary-blue shadow-sm"
                              : "text-text-secondary"
                          )}
                        >
                          {profile.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Profile Specific View */}
                  <AnimatePresence mode="wait">
                    {familyProfile === "self" && (
                      <motion.div
                        key="self"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-4 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-blue/10 border border-primary-blue/15 text-primary-blue flex items-center justify-center font-bold text-sm">JD</div>
                          <div>
                            <h5 className="font-bold text-deep-blue text-sm">Jane Doe</h5>
                            <span className="text-[10px] text-text-secondary">Primary Account Profile</span>
                          </div>
                        </div>
                        <div className="p-4 bg-bg-pale/70 border border-border-pale/60 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between font-semibold border-b border-border-pale/40 pb-2 text-[10px] text-text-secondary uppercase">
                            <span>Diagnostic Date</span>
                            <span>Report Details</span>
                          </div>
                          <div className="flex justify-between text-deep-blue">
                            <span>07/10/2026</span>
                            <strong>Lipid Panel &amp; Glucose</strong>
                          </div>
                          <div className="flex justify-between text-deep-blue">
                            <span>05/12/2026</span>
                            <strong>Complete Blood Count</strong>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {familyProfile === "parent" && (
                      <motion.div
                        key="parent"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-4 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-500 flex items-center justify-center font-bold text-sm">RD</div>
                          <div>
                            <h5 className="font-bold text-deep-blue text-sm">Robert Doe</h5>
                            <span className="text-[10px] text-text-secondary">Dependent Parent Profile</span>
                          </div>
                        </div>
                        <div className="p-4 bg-bg-pale/70 border border-border-pale/60 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between font-semibold border-b border-border-pale/40 pb-2 text-[10px] text-text-secondary uppercase">
                            <span>Diagnostic Date</span>
                            <span>Report Details</span>
                          </div>
                          <div className="flex justify-between text-deep-blue">
                            <span>06/04/2026</span>
                            <strong>HbA1c &amp; Kidney Panel</strong>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {familyProfile === "child" && (
                      <motion.div
                        key="child"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="space-y-4 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center font-bold text-sm">LD</div>
                          <div>
                            <h5 className="font-bold text-deep-blue text-sm">Leo Doe</h5>
                            <span className="text-[10px] text-text-secondary">Child Profile</span>
                          </div>
                        </div>
                        <div className="p-4 bg-bg-pale/70 border border-border-pale/60 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between font-semibold border-b border-border-pale/40 pb-2 text-[10px] text-text-secondary uppercase">
                            <span>Diagnostic Date</span>
                            <span>Report Details</span>
                          </div>
                          <div className="flex justify-between text-deep-blue">
                            <span>04/18/2026</span>
                            <strong>Allergy Screening (IgE)</strong>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Copy */}
            <div className="lg:col-span-6 lg:order-1 flex flex-col gap-6">
              <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Family Profiles</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue leading-tight">
                Manage Multiple Profiles from One Login
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                Keep your family's records organized without confusing variables. Switch between profiles to check timelines, medication checklists, and diagnostic histories.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Isolated Timelines", desc: "No crossed reports" },
                  { title: "Dependent Controls", desc: "For kids & parents" },
                  { title: "Separate Documents", desc: "Independent files libraries" },
                  { title: "Strict Data Isolation", desc: "Profile-level privacy" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 text-left">
                    <CheckCircle2 size={16} className="text-health-green shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-deep-blue text-xs">{item.title}</h4>
                      <p className="text-text-secondary text-[11px] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 10. MEDICATION AND EMERGENCY FEATURES */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-white">
        <Container>
          <SectionHeading
            label="Day-To-Day Care"
            title="Medications & Emergency Timelines"
            description="Manage your routine medicines alongside essential medical parameters in one secure portal."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Card 1: Meds */}
            <ScrollReveal direction="up" className="rounded-3xl border border-border-pale bg-white shadow-premium p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-primary-blue/10 text-primary-blue">
                    <Calendar size={18} />
                  </div>
                  <h4 className="font-bold text-deep-blue text-base">Medication Schedule</h4>
                </div>
                <span className="text-[10px] font-bold bg-bg-pale text-primary-blue px-2 py-0.5 rounded-full border border-border-pale">
                  Today
                </span>
              </div>

              {/* Checklist */}
              <div className="space-y-3.5">
                {meds.map((med) => (
                  <div
                    key={med.id}
                    onClick={() => toggleMed(med.id)}
                    className={cn(
                      "flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all",
                      med.taken
                        ? "border-emerald-100 bg-emerald-50/20 text-text-secondary"
                        : "border-border-pale hover:border-primary-blue/30 bg-white text-deep-blue"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center text-xs", med.taken ? "bg-emerald-500 border-emerald-500 text-white" : "border-border-pale bg-white")} />
                      <div>
                        <span className={cn("font-bold text-sm", med.taken && "line-through")}>
                          {med.name}
                        </span>
                        <p className="text-[10px] text-text-secondary">{med.time}</p>
                      </div>
                    </div>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold", med.taken ? "bg-emerald-100 text-emerald-700" : "bg-bg-pale text-text-secondary")}>
                      {med.taken ? "Taken" : "Mark Taken"}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Card 2: Emergency */}
            <ScrollReveal direction="up" delay={0.1} className="rounded-3xl border border-border-pale bg-white shadow-premium p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-red-50 text-red-500">
                    <AlertTriangle size={18} />
                  </div>
                  <h4 className="font-bold text-deep-blue text-base">Emergency Medical Profile</h4>
                </div>
                <span className="text-[10px] font-bold bg-red-50 text-red-500 px-2.5 py-0.5 rounded-full border border-red-100 animate-pulse">
                  Emergency Info
                </span>
              </div>

              {/* Emergency details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-bg-pale rounded-xl border border-border-pale/60">
                    <span className="text-[10px] text-text-secondary block">Blood Type</span>
                    <strong className="text-deep-blue text-lg">O Positive (O+)</strong>
                  </div>
                  <div className="p-3 bg-bg-pale rounded-xl border border-border-pale/60">
                    <span className="text-[10px] text-text-secondary block">Known Allergies</span>
                    <strong className="text-red-500 text-sm">Penicillin, Peanuts</strong>
                  </div>
                </div>

                <div className="p-4 bg-bg-pale rounded-xl border border-border-pale/60 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-text-secondary block">Primary Contact</span>
                    <strong className="text-deep-blue text-sm">Sarah Doe (Spouse)</strong>
                  </div>
                  <a
                    href="tel:1234567890"
                    className="p-2.5 bg-white border border-border-pale rounded-xl text-primary-blue hover:text-white hover:bg-primary-blue hover:border-primary-blue transition-all"
                  >
                    <PhoneCall size={16} />
                  </a>
                </div>

                <p className="text-[10px] text-text-secondary leading-relaxed italic">
                  * Note: This profile is stored locally on your device for fast access by first responders and does not connect to emergency dispatcher lines.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 11. SECURITY AND PRIVACY SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 relative z-10 bg-bg-pale/50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Data Protection</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-deep-blue leading-tight">
                Your Health Records are Secure and Private
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                We handle health documents with care. HealthLens employs secure encryption and strict user deletion protocols.
              </p>
              <div className="flex">
                <GradientButton href="/security" className="text-xs">
                  Learn About Security
                </GradientButton>
              </div>
            </div>

            {/* Right Badges Board */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SecurityBadge type="encryption" />
              <SecurityBadge type="privacy" />
              <SecurityBadge type="control" />
              <SecurityBadge type="compliance" />
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 12. APP EXPERIENCE SECTION (SCREEN SHOWCASE) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-white relative z-10 overflow-hidden">
        <Container>
          <SectionHeading
            label="Mobile Experience"
            title="Sleek Health Companion App"
            description="Swipe through standard mobile dashboard screens built with clean iOS and Android UI standards."
          />

          {/* Swipeable / scrollable screen carousel */}
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 scrollbar-none snap-x justify-start md:justify-center">
            {[
              { title: "Home Dashboard", subtitle: "Metric Overview" },
              { title: "Upload Report", subtitle: "OCR Scan Screen" },
              { title: "Report Analysis", subtitle: "Simplified Summaries" },
              { title: "Reports Library", subtitle: "Document Vault" },
              { title: "AI Copilot", subtitle: "Virtual assistant chat" },
            ].map((screen, idx) => (
              <div key={idx} className="snap-center shrink-0">
                <PhoneFrame>
                  <div className="flex flex-col h-full bg-bg-pale p-4 text-center justify-between">
                    <div className="mt-8 flex flex-col gap-1 items-center">
                      <span className="text-[9px] font-bold text-primary-blue uppercase bg-primary-blue/10 px-2 py-0.5 rounded border border-primary-blue/10">
                        {screen.subtitle}
                      </span>
                      <h5 className="font-bold text-deep-blue text-sm mt-1">{screen.title}</h5>
                    </div>

                    <div className="flex-grow flex items-center justify-center p-4">
                      {/* Stylized vector representation */}
                      <div className="w-full h-36 rounded-2xl bg-white border border-border-pale shadow-sm flex flex-col items-center justify-center p-3 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-blue/5 to-health-green/5" />
                        <Activity size={24} className="text-primary-blue mb-2 animate-pulse" />
                        <span className="text-[10px] font-bold text-deep-blue">Pulse Rate</span>
                        <strong className="text-base text-deep-blue mt-1">72 bpm</strong>
                      </div>
                    </div>

                    <div className="pb-4">
                      <span className="text-[9px] text-text-secondary">HealthLens App v1.0</span>
                    </div>
                  </div>
                </PhoneFrame>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 13. FAQ SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-28 bg-bg-pale/50 relative z-10" id="faq">
        <Container>
          <SectionHeading
            label="Answers"
            title="Frequently Asked Questions"
            description="Everything you need to know about our health record summaries, privacy controls, and features."
          />
          <FAQAccordion items={homepageFAQs} />
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 14. FINAL CTA */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 relative z-10 overflow-hidden bg-deep-blue text-white text-center">
        {/* Animated pattern layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(11,110,243,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(24,185,129,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-grid-overlay opacity-5 pointer-events-none" />

        <Container className="relative z-10 max-w-4xl flex flex-col items-center gap-6">
          <ScrollReveal direction="down">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-accent-cyan border border-white/10">
              <Sparkles size={12} />
              Take Control Today
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-2xl leading-tight">
              Take Control of Your Health Information
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-zinc-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Join HealthLens and turn complex medical reports into clear, organized, and actionable information.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3} className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-4">
            <GradientButton href="/coming-soon" icon={<ArrowRight size={16} />}>
              Get Early Access
            </GradientButton>
            <Link
              href="/features"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-white font-semibold text-sm sm:text-base transition-all duration-300"
            >
              Explore Features
            </Link>
          </ScrollReveal>
        </Container>
      </section>
    </div>
  );
}
