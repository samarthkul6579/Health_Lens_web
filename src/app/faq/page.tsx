"use client";
import React from "react";
import Container from "@/components/common/Container";
import FAQAccordion from "@/components/ui/FAQAccordion";

const detailedFAQs = [
  {
    question: "What types of reports can I upload?",
    answer: "You can upload PDF documents or image files (JPEG, PNG) of standard laboratory tests. This includes Complete Blood Counts (CBC), Metabolic Panels, Lipid Profiles (Cholesterol), Thyroid Panels (TSH), Liver Panel tests, and General Urinalysis sheets.",
  },
  {
    question: "Does HealthLens provide a medical diagnosis?",
    answer: "Absolutely not. HealthLens is an educational tool. We simplify the dense language, map parameters against standard ranges, and highlight items to review, but only a licensed healthcare professional can diagnose, treat, or suggest modifications to your clinical care.",
  },
  {
    question: "How secure is my health report data?",
    answer: "Security is our primary concern. We utilize enterprise-grade AES-256 encryption for files and database tables. Only you can read or authorize sharing of your files. Our platform runs regular security audits to protect against vulnerabilities.",
  },
  {
    question: "Can I delete my reports permanently?",
    answer: "Yes, deletion controls are entirely user-controlled. When you delete a file or close your profile, your documents are permanently purged from our storage cloud immediately, leaving no backup copies behind.",
  },
  {
    question: "How does the report comparison engine work?",
    answer: "When you upload consecutive files (e.g. blood tests from June and December), our system automatically aligns identical markers (like hemoglobin or blood sugar) and plots them on a trend graph so you can easily visual shifts over time.",
  },
  {
    question: "Can I manage records for my family members?",
    answer: "Yes, HealthLens supports isolated profiles under a single parent account. This allows you to manage reports and track parameters for elderly parents, spouses, or children, with their respective histories and documents cleanly divided.",
  },
  {
    question: "Is there an App Store or Play Store application?",
    answer: "The mobile applications for iOS and Android are currently in private beta. Early testers can request access on this page to receive instructions when our registrations expand.",
  },
  {
    question: "What technology does HealthLens use?",
    answer: "We use high-fidelity layout scanning (OCR) engines to capture raw values from sheets, combined with medical NLP parsers that translate abbreviations into simple terms and link them to public anatomical resource definitions.",
  },
  {
    question: "Do you sell health profiles or reports to third parties?",
    answer: "No. We never sell, lease, or monetize user profiles, diagnostic values, or uploads to insurers, researchers, or advertising companies. Your records are entirely private.",
  },
  {
    question: "What if the scan fails or misinterprets a value?",
    answer: "While our parser is highly accurate, layout variations can occasionally cause scanning errors. Users can edit values on their dashboards to match their actual lab sheets and verify correctness before saving.",
  },
  {
    question: "Does the AI assistant replace consultations?",
    answer: "No. The AI Copilot is designed to prepare you for your consultations. It highlights out-of-range thresholds and lists logical questions to help you have more productive, detailed conversations with your doctor.",
  },
  {
    question: "Is there a limit on how many reports I can upload?",
    answer: "During our beta phase, users can upload up to 25 reports to their personal vault for free. We will introduce premium expansion plans when the full version goes live.",
  },
  {
    question: "Do you support international lab units?",
    answer: "Yes, our system handles standard units including mg/dL, g/dL, mmol/L, and others, converting them where required to maintain correct trend line alignments.",
  },
  {
    question: "Can I export my structured timeline history?",
    answer: "Yes, you can export your health values as structured PDF dashboards or CSV spreadsheets to share during visits or file with other health managers.",
  },
  {
    question: "How can I join the Early Access program?",
    answer: "Simply navigate to our 'Download App' or Homepage final banner, submit your email address, and we will send a notification with instructions as soon as a slot opens.",
  },
];

export default function FAQPage() {
  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Help Center
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Find quick answers about diagnostic scan layouts, medical summary safety, and data vault privacy rules.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mb-16">
          <FAQAccordion items={detailedFAQs} />
        </div>
      </Container>
    </div>
  );
}
