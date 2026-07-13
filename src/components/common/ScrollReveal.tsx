"use client";
import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
}: ScrollRevealProps) {
  const getVariants = () => {
    const offset = 30;
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: offset },
          visible: { opacity: 1, y: 0 },
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -offset },
          visible: { opacity: 1, y: 0 },
        };
      case "left":
        return {
          hidden: { opacity: 0, x: offset },
          visible: { opacity: 1, x: 0 },
        };
      case "right":
        return {
          hidden: { opacity: 0, x: -offset },
          visible: { opacity: 1, x: 0 },
        };
      case "none":
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}
