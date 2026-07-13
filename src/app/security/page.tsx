"use client";
import React from "react";
import Image from "next/image";
import { Shield, Lock, EyeOff, CheckCircle, Database, Trash2, Key } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import ScrollReveal from "@/components/common/ScrollReveal";
import SecurityBadge from "@/components/ui/SecurityBadge";

const pillars = [
  {
    icon: <Key size={20} />,
    title: "Secure Authentication",
    desc: "Access your dashboard using secure authentication, with multi-factor authentication support for additional device lock verification.",
  },
  {
    icon: <Database size={20} />,
    title: "AES-256 Encrypted Storage",
    desc: "Uploaded files are encrypted using AES-256 standard protocols. No raw files are readable directly on database storage discs.",
  },
  {
    icon: <EyeOff size={20} />,
    title: "Zero-Knowledge Cloud Keys",
    desc: "Encryption architecture protects data key ownership. Only you can decode the diagnostic values or share them.",
  },
  {
    icon: <Trash2 size={20} />,
    title: "Permanent User Deletion",
    desc: "You control your health records. When you choose to delete a file or close your profile, it is instantly and permanently wiped.",
  },
];

export default function SecurityPage() {
  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Data Protection
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            Security &amp; Privacy First
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            We handle diagnostic metrics with respect for confidentiality. Review our security design.
          </p>
        </div>

        {/* Security Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-4xl mx-auto">
          <SecurityBadge type="encryption" />
          <SecurityBadge type="privacy" />
          <SecurityBadge type="control" />
          <SecurityBadge type="compliance" />
        </div>

        {/* Detail Security Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">Architecture Guidelines</span>
            <h2 className="text-3xl font-bold text-deep-blue leading-tight">
              Built on Modern Data Security Principles
            </h2>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Our architecture isolates records at the profile level, preventing public leaks and ensuring that data is only available when requested.
            </p>

            <div className="space-y-4.5">
              {pillars.map((p, i) => (
                <div key={i} className="flex gap-3 text-left">
                  <div className="p-2.5 bg-white border border-border-pale rounded-xl text-primary-blue h-fit shrink-0">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-deep-blue text-sm sm:text-base">{p.title}</h4>
                    <p className="text-text-secondary text-xs sm:text-sm mt-0.5 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-square rounded-[28px] overflow-hidden shadow-premium-xl border border-border-pale">
              <Image
                src="/images/generated/secure_storage_illustration.png"
                alt="Secure cloud storage vaults"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Note on compliance */}
        <ScrollReveal className="max-w-3xl mx-auto mt-20 text-center text-xs text-text-secondary bg-white p-6 rounded-2xl border border-border-pale">
          <p className="leading-relaxed">
            <strong>Security Notice:</strong> HealthLens is engineered to respect health data confidentiality rules. We run continuous vulnerability scans and enforce strict transport layer encryption. We are in the process of finalizing voluntary industry security reviews.
          </p>
        </ScrollReveal>
      </Container>
    </div>
  );
}
