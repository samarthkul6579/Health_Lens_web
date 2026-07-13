"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Calendar, CheckCircle2, AlertCircle, Smartphone } from "lucide-react";
import Container from "@/components/common/Container";
import GradientButton from "@/components/common/GradientButton";
import ScrollReveal from "@/components/common/ScrollReveal";

export default function ComingSoonPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatus("error");
      setStatusMessage("Please enter your name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setStatus("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const { joinWaitlistAction } = await import("@/lib/actions");
      const res = await joinWaitlistAction({ name, email, source: "coming_soon" });
      if (res.success) {
        setStatus("success");
        setEmail("");
        setName("");
      } else {
        setStatus("error");
        setStatusMessage(res.message);
      }
    } catch (err: any) {
      setStatus("error");
      setStatusMessage(err.message || "Failed to submit. Please try again.");
    }
  };

  const handleDownload = async (platform: string) => {
    try {
      const { trackDownloadAction } = await import("@/lib/actions");
      await trackDownloadAction(platform, "coming_soon_page");
      alert(`HealthLens for ${platform} is currently in closed beta. Since you're on the waitlist, you'll receive a beta invite link in your email!`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden flex-grow flex items-center justify-center">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-[32px] border border-border-pale p-8 sm:p-12 shadow-premium-xl">
          {/* Left Column: Email Capture */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10">
              <Smartphone size={12} />
              Mobile Application Beta
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-deep-blue tracking-tight leading-tight">
              HealthLens App is Coming Soon
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              We are finalizing our mobile client dashboards. Join our Early Access waitlist today to receive a beta invitation and be the first to scan your reports.
            </p>

            {/* Expected Release Schedule */}
            <div className="flex gap-4 p-4.5 bg-bg-pale rounded-2xl border border-border-pale/60 text-xs sm:text-sm text-deep-blue">
              <Calendar size={18} className="text-primary-blue shrink-0 mt-0.5" />
              <div>
                <strong className="block text-deep-blue">Expected Public Release:</strong>
                <span className="text-text-secondary">Closed Beta: Q3 2026 | App Stores: Q4 2026</span>
              </div>
            </div>

            {/* Signup Form */}
            {status === "success" ? (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex gap-3 text-xs sm:text-sm text-emerald-800 animate-fade-in">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Registration Successful!</strong>
                  <span>We've added your email address to our early access priority list. Stay tuned!</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3.5">
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="p-3.5 px-5 rounded-full bg-bg-pale border border-border-pale focus:outline-none focus:border-primary-blue text-sm text-deep-blue"
                    required
                  />
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="flex-grow p-3.5 px-5 rounded-full bg-bg-pale border border-border-pale focus:outline-none focus:border-primary-blue text-sm text-deep-blue"
                      required
                    />
                    <GradientButton type="submit" disabled={status === "loading"}>
                      {status === "loading" ? "Joining..." : "Join Waitlist"}
                    </GradientButton>
                  </div>
                </div>
                {status === "error" && (
                  <span className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={14} />
                    {statusMessage}
                  </span>
                )}
              </form>
            )}

            {/* Badge placeholders */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => handleDownload("Android")}
                className="px-5 py-2.5 bg-bg-pale hover:bg-bg-pale/80 border border-border-pale/80 rounded-xl flex items-center gap-3 text-left cursor-pointer transition-all active:scale-95"
              >
                <div className="w-5 h-5 bg-deep-blue text-white rounded flex items-center justify-center font-bold text-xs select-none">A</div>
                <div>
                  <span className="text-[9px] text-text-secondary uppercase tracking-wider block">Get it on</span>
                  <strong className="text-deep-blue text-xs font-bold">Google Play</strong>
                </div>
              </button>

              <button
                onClick={() => handleDownload("iOS")}
                className="px-5 py-2.5 bg-bg-pale hover:bg-bg-pale/80 border border-border-pale/80 rounded-xl flex items-center gap-3 text-left cursor-pointer transition-all active:scale-95"
              >
                <div className="w-5 h-5 bg-deep-blue text-white rounded flex items-center justify-center font-bold text-xs select-none">i</div>
                <div>
                  <span className="text-[9px] text-text-secondary uppercase tracking-wider block">Download on</span>
                  <strong className="text-deep-blue text-xs font-bold">App Store</strong>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: Graphic mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            <ScrollReveal direction="left">
              <div className="relative w-full max-w-[280px] aspect-square rounded-3xl overflow-hidden shadow-premium-xl border border-border-pale">
                <Image
                  src="/images/generated/hero_dashboard_mockup.png"
                  alt="HealthLens App dashboard preview"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </div>
  );
}
