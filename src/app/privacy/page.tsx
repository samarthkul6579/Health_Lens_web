"use client";
import React from "react";
import Container from "@/components/common/Container";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function PrivacyPolicyPage() {
  const lastUpdated = "July 11, 2026";

  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10 max-w-4xl">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Legal Statement
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-secondary">
            Last Updated: {lastUpdated}
          </p>
        </div>

        {/* Policy Body */}
        <ScrollReveal className="bg-white rounded-3xl border border-border-pale p-8 sm:p-12 shadow-premium space-y-8 text-sm sm:text-base text-text-secondary leading-relaxed">
          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">1. Introduction</h3>
            <p>
              HealthLens (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects the privacy of our users. This Privacy Policy explains how we collect, protect, and handle information when you upload diagnostic lab reports and interact with our web platform or mobile applications.
            </p>
            <p>
              By using our service, you acknowledge that you understand the data practices described in this document.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">2. Information Collection &amp; Use</h3>
            <p>
              When you upload files or sync health metrics, we parse values to display visual trends on your dashboard.
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Medical Report Files:</strong> Images or PDFs of blood panels, lipid ratios, and thyroid screenings.
              </li>
              <li>
                <strong>Profile Details:</strong> Account credentials, usernames, and family profile linkages.
              </li>
              <li>
                <strong>Technical Logs:</strong> Anonymous usage analytics to monitor performance and OCR scanner success rates.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">3. Data Security &amp; Encryption</h3>
            <p>
              We protect diagnostic files. HealthLens employs standard transport layer security (TLS) for transfers, and AES-256 encryption keys for documents stored on database servers.
            </p>
            <p>
              No third parties, including advertising networks or insurance companies, can buy, lease, or read your profile metrics.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">4. Deletion Controls</h3>
            <p>
              You hold full command over your health data vault. You can delete uploaded files or close your profile at any time. When you select &apos;Delete&apos;, files are permanently purged from database tables and storage disks immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-xl font-bold text-deep-blue">5. Contact and Inquiries</h3>
            <p>
              If you have any questions or concern regarding security protocols, encryption algorithms, or profile isolation rules, please email our support team at{" "}
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
