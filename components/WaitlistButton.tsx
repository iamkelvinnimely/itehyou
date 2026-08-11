"use client";

import { useCallback } from "react";
import { useWaitlist } from "./WaitlistProvider";

type WaitlistButtonProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "nav";
};

const variantClasses: Record<
  NonNullable<WaitlistButtonProps["variant"]>,
  string
> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover shadow-[0_0_0_1px_rgba(232,165,75,0.3)] hover:shadow-[0_8px_28px_rgba(232,165,75,0.25)]",
  ghost:
    "border border-border bg-transparent text-text-primary hover:border-accent/50 hover:bg-accent-muted",
  nav: "bg-accent text-background hover:bg-accent-hover text-sm px-4 py-2 md:px-5 md:py-2.5",
};

export default function WaitlistButton({
  children = "Join the Waitlist",
  className = "",
  variant = "primary",
}: WaitlistButtonProps) {
  const { openWaitlist } = useWaitlist();

  const handleClick = useCallback(() => {
    openWaitlist();
  }, [openWaitlist]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-md px-6 py-3 font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
