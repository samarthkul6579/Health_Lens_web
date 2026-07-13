"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits?: string[];
  className?: string;
  index?: number;
}

export default function FeatureCard({
  icon,
  title,
  description,
  benefits = [],
  className,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={cn(
        "group relative flex flex-col p-8 rounded-3xl bg-white border border-border-pale hover:border-primary-blue/30 shadow-premium hover:shadow-premium-xl transition-all duration-300 overflow-hidden",
        className
      )}
    >
      {/* Decorative hover gradient glow */}
      <div className="absolute -inset-px bg-gradient-to-r from-primary-blue/10 to-health-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[22px] pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon wrapper */}
        <div className="mb-6 inline-flex p-3 rounded-2xl bg-bg-pale text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-all duration-300 w-fit">
          {icon}
        </div>

        {/* Text content */}
        <h3 className="text-xl font-bold text-deep-blue mb-3 group-hover:text-primary-blue transition-colors">
          {title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        {/* Benefits bullets */}
        {benefits.length > 0 && (
          <ul className="space-y-2 border-t border-border-pale/50 pt-4 mt-auto">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                <svg
                  className="w-4 h-4 text-health-green shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
