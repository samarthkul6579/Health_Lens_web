"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Heart } from "lucide-react";
import Logo from "../ui/Logo";
import Container from "../common/Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subStatus, setSubStatus] = useState<"idle" | "success" | "error">("idle");
  const [subMsg, setSubMsg] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      setSubStatus("error");
      setSubMsg("Please enter a valid email address.");
      return;
    }
    setSubscribing(true);
    setSubStatus("idle");
    setSubMsg("");

    try {
      const { subscribeNewsletterAction } = await import("@/lib/actions");
      const res = await subscribeNewsletterAction(newsletterEmail);
      if (res.success) {
        setSubStatus("success");
        setNewsletterEmail("");
      } else {
        setSubStatus("error");
        setSubMsg(res.message);
      }
    } catch (err: any) {
      setSubStatus("error");
      setSubMsg("Something went wrong. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <footer className="bg-white border-t border-border-pale/80 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(11,110,243,0.02),transparent_40%)] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 flex flex-col gap-5">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              Your AI-powered health companion. We turn complex medical reports into clear, organized, and actionable health insights for you and your family.
            </p>

            {/* Newsletter form */}
            <div className="flex flex-col gap-2 mt-1">
              <span className="text-xs font-bold text-deep-blue uppercase tracking-wider">Subscribe to Newsletter</span>
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-grow p-2.5 px-4 rounded-full bg-bg-pale border border-border-pale text-xs focus:outline-none focus:border-primary-blue text-deep-blue"
                  required
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="bg-primary-blue hover:bg-deep-blue text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all shrink-0 cursor-pointer disabled:bg-primary-blue/50"
                >
                  {subscribing ? "..." : "Subscribe"}
                </button>
              </form>
              {subStatus === "success" && (
                <span className="text-[10px] text-emerald-600 font-semibold">Subscribed successfully!</span>
              )}
              {subStatus === "error" && (
                <span className="text-[10px] text-red-500 font-semibold">{subMsg}</span>
              )}
            </div>

            <div className="flex gap-4 items-center">
              <a href="#" className="p-2 rounded-full border border-border-pale text-text-secondary hover:text-primary-blue hover:border-primary-blue/30 transition-all duration-200" aria-label="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-full border border-border-pale text-text-secondary hover:text-primary-blue hover:border-primary-blue/30 transition-all duration-200" aria-label="Github">
                <Github size={16} />
              </a>
              <a href="#" className="p-2 rounded-full border border-border-pale text-text-secondary hover:text-primary-blue hover:border-primary-blue/30 transition-all duration-200" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>


          {/* Product Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-deep-blue text-sm uppercase tracking-wider">Product</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/features" className="text-text-secondary hover:text-primary-blue transition-colors">Features</Link></li>
              <li><Link href="/ai-analysis" className="text-text-secondary hover:text-primary-blue transition-colors">AI Analysis</Link></li>
              <li><Link href="/health-insights" className="text-text-secondary hover:text-primary-blue transition-colors">Health Insights</Link></li>
              <li><Link href="/security" className="text-text-secondary hover:text-primary-blue transition-colors">Security</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-deep-blue text-sm uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/about" className="text-text-secondary hover:text-primary-blue transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-text-secondary hover:text-primary-blue transition-colors">Contact</Link></li>
              <li><Link href="/book-demo" className="text-text-secondary hover:text-primary-blue transition-colors font-semibold">Book a Demo</Link></li>
              <li><Link href="/coming-soon" className="text-text-secondary hover:text-primary-blue transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Resources & Download Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-deep-blue text-sm uppercase tracking-wider">Resources</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link href="/faq" className="text-text-secondary hover:text-primary-blue transition-colors">FAQ</Link></li>
              <li><Link href="/privacy" className="text-text-secondary hover:text-primary-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-text-secondary hover:text-primary-blue transition-colors">Terms of Service</Link></li>
              <li>
                <span className="text-xs text-primary-blue/80 font-semibold px-2 py-0.5 bg-primary-blue/10 rounded border border-primary-blue/10">
                  App Store Coming Soon
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="border-t border-border-pale/60 pt-8 pb-6 text-xs text-text-secondary leading-relaxed text-center sm:text-left flex flex-col gap-4">
          <p className="bg-bg-pale/80 p-4 rounded-xl border border-border-pale/40">
            <strong>Medical Disclaimer:</strong> HealthLens provides informational explanations and does not replace professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider regarding a medical condition or interpreting diagnostic results. Never disregard professional medical advice or delay seeking it because of information found on this platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <p>&copy; {currentYear} HealthLens Inc. All rights reserved.</p>
            <p className="flex items-center gap-1.5 justify-center">
              Understand. Track. Improve. Live Better.
              <Heart size={12} className="text-primary-blue fill-primary-blue" />
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
