import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function GradientButton({
  children,
  href,
  className,
  icon,
  iconPosition = "right",
  ...props
}: GradientButtonProps) {
  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-0.5">{icon}</span>}
      <span className="font-semibold">{children}</span>
      {icon && iconPosition === "right" && <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const classes = cn(
    "group inline-flex items-center justify-center px-6 py-3 rounded-full text-white bg-gradient-to-r from-primary-blue to-accent-cyan hover:from-primary-blue hover:to-health-green transition-all duration-300 shadow-md hover:shadow-lg shadow-primary-blue/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm md:text-base",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
