"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Sparkles,
  Lock,
  Calendar,
  Users,
  AlertTriangle,
  Database,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import GradientButton from "@/components/common/GradientButton";
import ScrollReveal from "@/components/common/ScrollReveal";

const featuresList = [
  {
    id: "analysis",
    icon: <Brain size={24} />,
    title: "AI Report Analysis",
    description: "Upload diagnostic reports in image or PDF format. Our custom LLMs parse the raw data and translate terms into plain language.",
    image: "/images/generated/report_analysis_illustration.png",
    benefits: [
      "Translates clinical terminology instantly",
      "Highlights out-of-range values",
      "Generates clear, simple summaries",
    ],
  },
  {
    id: "copilot",
    icon: <Sparkles size={24} />,
    title: "AI Copilot Assistant",
    description: "Interact with a secure, context-aware chatbot. Ask questions about specific lab results and receive structured, report-cited answers.",
    image: "/images/generated/ai_assistant_illustration.png",
    benefits: [
      "Answers questions about values in context",
      "Suggests relevant questions for doctor",
      "Strict clinical safety parameters",
    ],
  },
  {
    id: "insights",
    icon: <TrendingUp size={24} />,
    title: "Personalized Health Insights",
    description: "Understand your diagnostic indicators in simple terms. Spot patterns and see how dietary changes correspond to lab metrics.",
    image: "/images/generated/health_trends_illustration.png",
    benefits: [
      "Visual marker explanations",
      "Health scorecard ratings",
      "Risk factor context grids",
    ],
  },
  {
    id: "comparison",
    icon: <TrendingUp size={24} />,
    title: "Report Comparison",
    description: "Align multiple historical reports side-by-side. Track whether values like hemoglobin, cholesterol, or blood sugar are improving.",
    image: "/images/generated/health_trends_illustration.png",
    benefits: [
      "Side-by-side parameter alignment",
      "Relative progression markers (+/-)",
      "Long-term timeline visualizations",
    ],
  },
  {
    id: "tracker",
    icon: <Calendar size={24} />,
    title: "Medication Tracker",
    description: "Log your medicine schedule and set smart reminders to stay on top of daily vitamin, iron, or prescription schedules.",
    image: "/images/generated/medication_tracking_illustration.png",
    benefits: [
      "Custom medicine alarm logging",
      "Adherence tracking scorecards",
      "Automatic refilling reminders",
    ],
  },
  {
    id: "family",
    icon: <Users size={24} />,
    title: "Family Health Profiles",
    description: "Add isolated accounts for dependents like elderly parents or children to manage their medical timelines from one place.",
    image: "/images/generated/family_profiles_illustration.png",
    benefits: [
      "Independent timeline calendars",
      "Separate PDF report vaults",
      "Easy, one-click profile switching",
    ],
  },
  {
    id: "emergency",
    icon: <AlertTriangle size={24} />,
    title: "Emergency Information",
    description: "Keep critical details like blood type, penicillin allergies, and emergency medical contacts pinned to a local dashboard.",
    image: "/images/generated/doctor_prep_illustration.png",
    benefits: [
      "Offline-first mobile dashboard speed",
      "Key diagnostic warning tags",
      "First responder contact linkages",
    ],
  },
  {
    id: "storage",
    icon: <Database size={24} />,
    title: "Secure Encrypted Vault",
    description: "Store your diagnostic history in a zero-knowledge cloud folder. All uploads are encrypted before reaching servers.",
    image: "/images/generated/secure_storage_illustration.png",
    benefits: [
      "AES-256 cloud encryption",
      "Zero public document indexing",
      "100% user-controlled deletion",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Product Features
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            Explore HealthLens Features
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Discover the secure tools engineered to help you understand, compare, and track medical parameters.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {featuresList.map((feat, idx) => (
            <ScrollReveal
              key={feat.id}
              direction="up"
              delay={idx * 0.05}
              className="bg-white rounded-3xl border border-border-pale p-8 shadow-premium hover:shadow-premium-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Feature Header */}
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-primary-blue/10 text-primary-blue">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-deep-blue">{feat.title}</h3>
                </div>

                {/* Illustration */}
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-bg-pale flex items-center justify-center border border-border-pale/40">
                  <Image
                    src={feat.image}
                    alt={feat.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-text-secondary text-sm leading-relaxed">{feat.description}</p>

                {/* Benefits checklist */}
                <ul className="space-y-2 pt-2">
                  {feat.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                      <CheckCircle2 size={14} className="text-health-green shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-border-pale/40">
                <Link
                  href="/coming-soon"
                  className="group inline-flex items-center justify-center gap-1.5 font-bold text-sm text-primary-blue hover:text-deep-blue transition-colors"
                >
                  Request early access
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Page Footer CTA */}
        <ScrollReveal className="bg-deep-blue text-white rounded-3xl p-10 text-center relative overflow-hidden mt-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(24,185,129,0.15),transparent_60%)]" />
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold">Ready to take control of your reports?</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              Join our closed beta today to start uploading medical files and monitoring metrics.
            </p>
            <div className="flex justify-center">
              <GradientButton href="/coming-soon">Join Closed Beta</GradientButton>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
