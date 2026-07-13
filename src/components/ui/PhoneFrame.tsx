import React from "react";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}

export default function PhoneFrame({
  children,
  className,
  screenClassName,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto border-[10px] border-deep-blue bg-deep-blue rounded-[36px] shadow-premium-xl w-full max-w-[280px] aspect-[9/18.5] overflow-hidden select-none shrink-0",
        className
      )}
    >
      {/* Top speaker & dynamic island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
        {/* Camera dot */}
        <div className="absolute right-3 w-1.5 h-1.5 bg-zinc-800 rounded-full" />
      </div>

      {/* Screen area */}
      <div
        className={cn(
          "w-full h-full bg-white rounded-[26px] overflow-hidden relative z-20 flex flex-col",
          screenClassName
        )}
      >
        {children}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/30 rounded-full z-30" />
    </div>
  );
}
