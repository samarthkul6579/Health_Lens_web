import React from "react";
import { Shield, Key, EyeOff, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecurityBadgeProps {
  type: "encryption" | "privacy" | "control" | "compliance";
  className?: string;
}

const badgeConfigs = {
  encryption: {
    title: "AES-256 Encryption",
    description: "All report files and personal health metrics are encrypted both in transit and at rest.",
    icon: <Key size={20} />,
  },
  privacy: {
    title: "Zero-Knowledge Storage",
    description: "Only you and individuals you explicitly authorize have keys to read or edit reports.",
    icon: <EyeOff size={20} />,
  },
  control: {
    title: "100% User Control",
    description: "Every file can be deleted permanently at any second. Deletion wipes files from servers instantly.",
    icon: <Shield size={20} />,
  },
  compliance: {
    title: "Secure Architecture",
    description: "Engineered from the ground up using medical data security principles and standard access controls.",
    icon: <CheckCircle size={20} />,
  },
};

export default function SecurityBadge({ type, className }: SecurityBadgeProps) {
  const config = badgeConfigs[type];

  return (
    <div
      className={cn(
        "flex gap-4 p-5 rounded-2xl bg-white border border-border-pale shadow-premium hover:shadow-premium-lg transition-all duration-200 text-left",
        className
      )}
    >
      <div className="p-3 rounded-xl bg-primary-blue/10 text-primary-blue h-fit shrink-0">
        {config.icon}
      </div>
      <div>
        <h4 className="font-bold text-deep-blue text-sm mb-1">{config.title}</h4>
        <p className="text-text-secondary text-xs leading-relaxed">{config.description}</p>
      </div>
    </div>
  );
}
