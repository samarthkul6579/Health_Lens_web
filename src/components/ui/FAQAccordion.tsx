"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4 max-w-3xl mx-auto w-full", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              "rounded-2xl border transition-all duration-300 bg-white",
              isOpen ? "border-primary-blue/30 shadow-premium-lg" : "border-border-pale shadow-premium"
            )}
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-semibold text-deep-blue text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary-blue/30 rounded-2xl cursor-pointer"
              aria-expanded={isOpen}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={18}
                className={cn("text-primary-blue transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-border-pale/40 mt-1">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
