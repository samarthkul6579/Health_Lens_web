"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, HelpCircle, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import GradientButton from "@/components/common/GradientButton";
import ScrollReveal from "@/components/common/ScrollReveal";

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    setSubmitStatus("loading");

    try {
      const { sendContactMessageAction } = await import("@/lib/actions");
      const res = await sendContactMessageAction(data);
      if (res.success) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    }
  };


  return (
    <div className="bg-bg-pale py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none z-0" />

      <Container className="relative z-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-deep-blue tracking-tight mb-6">
            Contact Our Team
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Have questions about early access, safety protocols, or business partnerships? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl border border-border-pale p-8 shadow-premium space-y-6">
              <h3 className="text-xl font-bold text-deep-blue">Contact Information</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Whether you are a developer, physician, partner, or user, we would love to hear from you.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex gap-3.5 items-center">
                  <div className="p-3 bg-primary-blue/10 text-primary-blue rounded-xl shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-secondary block">Email Us</span>
                    <a href="mailto:support@healthlens.com" className="font-bold text-deep-blue text-sm hover:text-primary-blue transition-colors">
                      support@healthlens.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-3.5 items-center">
                  <div className="p-3 bg-primary-blue/10 text-primary-blue rounded-xl shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-text-secondary block">Location</span>
                    <span className="font-bold text-deep-blue text-sm">
                      San Francisco, California, USA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick links card */}
            <div className="bg-gradient-to-r from-primary-blue/5 to-health-green/5 rounded-3xl border border-primary-blue/15 p-8 flex items-center gap-5">
              <div className="p-3 bg-white text-primary-blue border border-primary-blue/10 rounded-2xl shrink-0">
                <HelpCircle size={24} />
              </div>
              <div>
                <h4 className="font-extrabold text-deep-blue text-sm">Have basic questions?</h4>
                <p className="text-text-secondary text-xs mt-1">
                  Check out our answers on FAQ sheet.
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-1 font-bold text-xs text-primary-blue hover:text-deep-blue mt-3 group"
                >
                  Visit FAQ section
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-border-pale p-8 shadow-premium">
            <h3 className="text-xl font-bold text-deep-blue mb-6">Send A Message</h3>

            {submitStatus === "success" ? (
              <div className="py-10 text-center flex flex-col items-center gap-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-lg font-bold text-deep-blue">Message Sent Successfully</h4>
                <p className="text-text-secondary text-xs sm:text-sm max-w-sm">
                  Thank you for reaching out! A member of the HealthLens team will respond to your email address shortly.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="text-xs font-bold text-primary-blue hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold text-deep-blue uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} />
                      {errors.name.message}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold text-deep-blue uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} />
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-bold text-deep-blue uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Message subject"
                    className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue"
                    {...register("subject", { required: "Subject is required" })}
                  />
                  {errors.subject && (
                    <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} />
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-deep-blue uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describe your inquiry..."
                    className="p-3 px-4 rounded-xl bg-bg-pale border border-border-pale text-sm focus:outline-none focus:border-primary-blue text-deep-blue resize-none"
                    {...register("message", { required: "Message is required" })}
                  />
                  {errors.message && (
                    <span className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
                      <AlertCircle size={12} />
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="w-full flex items-center justify-center gap-2 bg-primary-blue hover:bg-deep-blue text-white text-sm font-semibold py-3.5 rounded-full shadow-premium transition-all duration-200 cursor-pointer disabled:bg-primary-blue/50"
                >
                  {submitStatus === "loading" ? "Submitting Message..." : "Submit Inquiry"}
                </button>

                {submitStatus === "error" && (
                  <span className="text-xs text-red-500 flex items-center justify-center gap-1 mt-2">
                    <AlertCircle size={14} />
                    Failed to send message. Please check connection and retry.
                  </span>
                )}
              </form>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
