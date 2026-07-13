import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export default function SecondaryButton({
  children,
  href,
  className,
  icon,
  iconPosition = "right",
  ...props
}: SecondaryButtonProps) {
  const content = (
    <>
      {icon && iconPosition === "left" && <span className="mr-2 transition-transform duration-200 group-hover:-translate-x-0.5">{icon}</span>}
      <span className="font-semibold">{children}</span>
      {icon && iconPosition === "right" && <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const classes = cn(
    "group inline-flex items-center justify-center px-6 py-3 rounded-full bg-white hover:bg-bg-pale text-deep-blue border border-border-pale hover:border-primary-blue/30 transition-all duration-300 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-sm md:text-base",
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
