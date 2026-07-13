import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 hover:scale-105 transition-transform duration-300"
      >
        <defs>
          {/* Left stem gradient (cyan to deep blue) */}
          <linearGradient id="left-stem-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#18A8E0" />
            <stop offset="100%" stopColor="#0B6EF3" />
          </linearGradient>
          {/* Right stem gradient (light green to dark green) */}
          <linearGradient id="right-stem-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9BD83D" />
            <stop offset="100%" stopColor="#18B981" />
          </linearGradient>
          {/* Bridge connector gradient */}
          <linearGradient id="connector-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0B6EF3" />
            <stop offset="100%" stopColor="#18B981" />
          </linearGradient>
        </defs>

        {/* Left vertical rounded stem */}
        <rect x="15" y="15" width="20" height="70" rx="10" fill="url(#left-stem-grad)" />

        {/* Right vertical rounded stem */}
        <rect x="65" y="15" width="20" height="70" rx="10" fill="url(#right-stem-grad)" />

        {/* Dome connector arch bridge */}
        <path
          d="M 35 50 C 35 35, 65 35, 65 50 V 60 C 65 60, 35 60, 35 60 Z"
          fill="url(#connector-grad)"
        />

        {/* White ECG pulse line overlay */}
        <path
          d="M 30 50 H 42 L 46 36 L 50 64 L 54 44 L 58 50 H 70"
          stroke="white"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      
      {!iconOnly && (
        <span className="font-sans font-bold text-xl tracking-tight text-deep-blue">
          Health<span className="text-health-green">Lens</span>
        </span>
      )}
    </div>
  );
}
