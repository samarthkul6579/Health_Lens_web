"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Mic, MessageSquare, Compass, Shield, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import GradientButton from "@/components/common/GradientButton";
import ScrollReveal from "@/components/common/ScrollReveal";
import AICopilotChat from "@/components/ui/AICopilotChat";

export default function AICopilotPage() {
  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            AI Assistant
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            Meet Your AI Health Copilot
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Ask specific questions regarding values in your database. Our copilot understands standard laboratory reference ranges and answers securely.
          </p>
        </div>

        {/* Chat Widget Panel */}
        <div className="mb-24">
          <ScrollReveal>
            <AICopilotChat />
          </ScrollReveal>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            {
              icon: <MessageSquare size={22} />,
              title: "Context-Aware Answers",
              desc: "Answers are mapped directly to your historical reports. We reference the exact documents in each response.",
            },
            {
              icon: <Compass size={22} />,
              title: "Clinically Framed Guides",
              desc: "Trained using public reference standards to identify anomalies and suggest logical doctor visit inquiries.",
            },
            {
              icon: <Shield size={22} />,
              title: "Strict Privacy Guardrails",
              desc: "Conversations are encrypted end-to-end. We never sell records, and deletion is permanent.",
            },
          ].map((feat, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 0.05}
              className="bg-white rounded-2xl border border-border-pale p-6 shadow-premium hover:shadow-premium-lg transition-all duration-300 space-y-4"
            >
              <div className="p-3 bg-primary-blue/10 text-primary-blue rounded-xl w-fit">
                {feat.icon}
              </div>
              <h3 className="font-bold text-deep-blue text-base sm:text-lg">{feat.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feat.desc}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* Voice Assistant Coming Soon */}
        <ScrollReveal className="max-w-4xl mx-auto rounded-[32px] border border-border-pale bg-white p-8 sm:p-12 shadow-premium flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-blue/5 to-health-green/5 blur-3xl pointer-events-none" />
          <div className="lg:w-3/5 space-y-5 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-health-green/10 text-health-green border border-health-green/10">
              <Mic size={12} className="animate-pulse" />
              Coming Soon
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-deep-blue">
              Conversational Voice Health Assistant
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Speak naturally to your health reports. Ask 'How are my cholesterol levels changing?' or 'Explain my metabolic profile' and hear simple, vocal breakdowns.
            </p>
            <div className="pt-2 flex justify-center lg:justify-start">
              <Link
                href="/coming-soon"
                className="group inline-flex items-center gap-1.5 font-bold text-sm text-primary-blue"
              >
                Join voice beta list
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
          <div className="lg:w-2/5 flex justify-center relative">
            {/* Visual audio waves */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-primary-blue to-accent-cyan flex items-center justify-center text-white shadow-premium shadow-primary-blue/30 relative">
              <div className="absolute inset-0 rounded-full border border-primary-blue/20 animate-ping" />
              <Mic size={42} />
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </div>
  );
}
