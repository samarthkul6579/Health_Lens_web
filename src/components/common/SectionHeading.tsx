import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 sm:mb-16 flex flex-col",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      {label && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-blue/10 text-primary-blue border border-primary-blue/10 mb-4 animate-pulse-slow">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-deep-blue leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
