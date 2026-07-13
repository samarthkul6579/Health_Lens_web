"use client";
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.min(Math.floor(duration * 60), 100);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.floor(end * (progress * (2 - progress)));

      setCount(current);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
}
