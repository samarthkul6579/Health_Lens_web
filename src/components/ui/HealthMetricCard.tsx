import React from "react";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthMetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  change?: string;
  changeType?: "increase" | "decrease" | "stable";
  status?: "Normal" | "Needs Attention";
  normalRange?: string;
  className?: string;
}

export default function HealthMetricCard({
  icon,
  label,
  value,
  unit,
  change,
  changeType = "stable",
  status = "Normal",
  normalRange,
  className,
}: HealthMetricCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl bg-white border border-border-pale shadow-premium hover:shadow-premium-lg transition-all duration-200",
        className
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 rounded-xl bg-bg-pale text-primary-blue">
          {icon}
        </div>
        <span
          className={cn(
            "text-xs font-semibold px-2.5 py-0.5 rounded-full border",
            status === "Normal"
              ? "bg-emerald-50 text-emerald-600 border-emerald-100"
              : "bg-red-50 text-red-500 border-red-100 animate-pulse"
          )}
        >
          {status}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{label}</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-extrabold text-deep-blue">{value}</span>
          {unit && <span className="text-sm font-semibold text-text-secondary">{unit}</span>}
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-border-pale/50 pt-4 mt-4 text-xs">
        {normalRange && (
          <span className="text-text-secondary">
            Range: <strong className="text-deep-blue">{normalRange}</strong>
          </span>
        )}
        {change && (
          <span
            className={cn(
              "flex items-center gap-0.5 font-bold",
              changeType === "increase"
                ? "text-emerald-500"
                : changeType === "decrease"
                ? "text-red-500"
                : "text-text-secondary"
            )}
          >
            {changeType === "increase" ? (
              <ArrowUpRight size={14} />
            ) : changeType === "decrease" ? (
              <ArrowDownRight size={14} />
            ) : null}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
