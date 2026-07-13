"use client";
import React, { useState } from "react";
import { Calendar, Building, Mail, Phone, MessageSquare, User, CheckCircle2, AlertCircle } from "lucide-react";
import Container from "@/components/common/Container";
import GradientButton from "@/components/common/GradientButton";

export default function BookDemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    preferred_date: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.preferred_date) {
      setStatus("error");
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const { bookDemoAction } = await import("@/lib/actions");
      const res = await bookDemoAction(formData);
      if (res.success) {
        setStatus("success");
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          preferred_date: "",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit demo request.");
    }
  };

  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden flex-grow flex items-center justify-center">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10 max-w-3xl">
        <div className="bg-white rounded-[32px] border border-border-pale p-8 sm:p-12 shadow-premium-xl">
          <div className="text-center max-w-lg mx-auto mb-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10">
              <Calendar size={12} />
              Corporate Demo Request
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-deep-blue tracking-tight">
              Book a HealthLens Demo
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Schedule a personalized walkthrough of the HealthLens AI processing engine, medical data isolation principles, and family panel capabilities.
            </p>
          </div>

          {status === "success" ? (
            <div className="py-12 text-center flex flex-col items-center gap-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-deep-blue">Demo Scheduled Successfully</h3>
              <p className="text-text-secondary text-sm max-w-md leading-relaxed">
                Thank you! We've received your request. A representative from the HealthLens team will contact you shortly to confirm the scheduled date and time.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm font-bold text-primary-blue hover:underline cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-deep-blue uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} className="text-text-secondary" />
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue transition-colors"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-xs font-bold text-deep-blue uppercase tracking-wider flex items-center gap-1.5">
                    <Building size={14} className="text-text-secondary" />
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    required
                    className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-deep-blue uppercase tracking-wider flex items-center gap-1.5">
                    <Mail size={14} className="text-text-secondary" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@company.com"
                    required
                    className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue transition-colors"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-bold text-deep-blue uppercase tracking-wider flex items-center gap-1.5">
                    <Phone size={14} className="text-text-secondary" />
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue transition-colors"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="preferred_date" className="text-xs font-bold text-deep-blue uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar size={14} className="text-text-secondary" />
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <input
                  id="preferred_date"
                  name="preferred_date"
                  type="date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  required
                  className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue transition-colors cursor-pointer"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-bold text-deep-blue uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare size={14} className="text-text-secondary" />
                  Additional Notes / Inquiries
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your team size, integration needs, etc..."
                  className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue resize-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-primary-blue hover:bg-deep-blue text-white text-sm font-semibold py-3.5 rounded-full shadow-premium hover:shadow-premium-lg transition-all duration-200 cursor-pointer disabled:bg-primary-blue/50"
                >
                  {status === "loading" ? "Scheduling Demo..." : "Request Live Demo"}
                </button>

                {status === "error" && (
                  <span className="text-xs text-red-500 flex items-center justify-center gap-1 mt-1">
                    <AlertCircle size={14} />
                    {errorMsg}
                  </span>
                )}
              </div>
            </form>
          )}
        </div>
      </Container>
    </div>
  );
}
