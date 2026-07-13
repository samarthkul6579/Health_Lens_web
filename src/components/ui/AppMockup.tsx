"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, CheckCircle2, FileText, Brain } from "lucide-react";

export default function AppMockup() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 -m-12 bg-gradient-to-tr from-primary-blue/20 via-accent-cyan/10 to-health-green/15 blur-3xl opacity-60 rounded-full animate-glow-pulse pointer-events-none" />

      {/* Main mockup card */}
      <div className="relative rounded-[28px] border border-border-pale bg-white shadow-premium-xl p-3 overflow-hidden group">
        {/* Animated Scan Line Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-full h-1 bg-gradient-to-r from-transparent via-primary-blue to-transparent shadow-[0_0_15px_#0B6EF3] opacity-60"
          />
        </div>

        {/* Dashboard screenshot */}
        <div className="relative rounded-[22px] overflow-hidden aspect-[9/16] bg-[#F7FAFF] flex items-center justify-center">
          <Image
            src="/images/generated/hero_dashboard_mockup.png"
            alt="HealthLens Mobile Dashboard Mockup"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
        </div>
      </div>

      {/* Floating Card 1: Scanning Alert */}
      <motion.div
        initial={{ opacity: 0, x: -30, y: 30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        className="absolute left-2 sm:-left-12 top-[12%] sm:top-1/4 z-30 flex items-center gap-2.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-border-pale shadow-premium-lg max-w-[180px] sm:max-w-[220px] scale-85 sm:scale-100 origin-left transition-all"
      >
        <div className="p-2 rounded-xl bg-red-50 text-red-500 shrink-0">
          <ShieldAlert size={18} className="animate-pulse" />
        </div>
        <div>
          <span className="text-[9px] sm:text-[10px] font-bold text-red-500 uppercase tracking-wider block">Attention Required</span>
          <h4 className="text-[11px] sm:text-xs font-bold text-deep-blue">Hemoglobin is Low</h4>
          <p className="text-[9px] sm:text-[10px] text-text-secondary">11.2 g/dL (Normal: 12-16)</p>
        </div>
      </motion.div>

      {/* Floating Card 2: AI Report Summary */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: -30 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        className="absolute right-2 sm:-right-12 bottom-1/5 sm:bottom-1/3 z-30 flex flex-col gap-2 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-border-pale shadow-premium-lg max-w-[200px] sm:max-w-[240px] scale-85 sm:scale-100 origin-right transition-all"
      >
        <div className="flex items-center gap-1.5 text-primary-blue">
          <Brain size={14} className="shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">AI Summary</span>
        </div>
        <p className="text-[10px] sm:text-xs text-deep-blue font-medium leading-relaxed">
          "Your CBC report indicates mild anemia. Other values including Platelets and WBC are in the healthy range."
        </p>
      </motion.div>

      {/* Floating Card 3: Healthy Pulse */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        className="absolute left-1/2 -translate-x-1/2 -bottom-4 sm:-bottom-6 sm:left-1/3 sm:translate-x-0 z-30 flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white border border-border-pale shadow-premium-lg scale-85 sm:scale-100 transition-all shrink-0 whitespace-nowrap"
      >
        <div className="p-2 rounded-full bg-emerald-50 text-emerald-500 shrink-0">
          <CheckCircle2 size={16} />
        </div>
        <div className="text-left">
          <h4 className="text-[11px] sm:text-xs font-bold text-deep-blue">Kidney Function</h4>
          <span className="text-[9px] sm:text-[10px] text-emerald-500 font-bold bg-emerald-50 px-2 py-0.5 rounded-full block">
            All normal (eGFR &gt; 90)
          </span>
        </div>
      </motion.div>
    </div>
  );
}
