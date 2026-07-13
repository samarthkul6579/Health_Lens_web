"use client";
import React from "react";
import Container from "@/components/common/Container";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function TermsConditionsPage() {
  const lastUpdated = "July 11, 2026";

  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10 max-w-4xl">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Legal Terms
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-text-secondary">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Terms Body */}
        <ScrollReveal className="bg-white rounded-3xl border border-border-pale p-8 sm:p-12 shadow-premium space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">1. Acceptance of Terms</h3>
            <p>
              By accessing or using the HealthLens marketing website, web dashboard, or mobile application (collectively, the &quot;Service&quot;), you agree to be bound by these Terms and Conditions. If you do not agree to all terms, you must not use or access the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">2. Medical Disclaimer (No Medical Advice)</h3>
            <p className="bg-bg-pale/80 p-4 rounded-xl border border-border-pale/60 font-medium text-deep-blue">
              <strong>IMPORTANT:</strong> HealthLens is an informational data simplification platform powered by AI. It does not provide medical diagnoses, treatment plans, clinical advice, or replace consultation with a qualified medical professional.
            </p>
            <p>
              All summaries, parameter definitions, ranges, and generated questions are provided for educational review only. Never disregard professional clinical guidance or delay booking an appointment due to reports parsed by HealthLens.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">3. User Accounts &amp; Conduct</h3>
            <p>
              To access files, upload records, or create family profile lists, you must establish an account. You are responsible for protecting your account credentials. You agree that you will not upload documents:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>That belong to a third party without their explicit consent.</li>
              <li>That contain malicious code, viruses, or aim to compromise database safety.</li>
              <li>For fraudulent or deceptive purposes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">4. Intellectual Property</h3>
            <p>
              The visual styling, layouts, logo symbols, brand themes, software code, illustrations, and animations featured on this website are the proprietary property of HealthLens Inc. and protected by copyright laws.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">5. Contact Information</h3>
            <p>
              Inquiries regarding these terms of use should be directed to our administration team at{" "}
              <a href="mailto:support@healthlens.com" className="text-primary-blue hover:underline">
                support@healthlens.com
              </a>
              .
            </p>
          </section>
        </ScrollReveal>
      </Container>
    </div>
  );
}
