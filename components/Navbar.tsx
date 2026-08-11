"use client";

import { useEffect, useState } from "react";
import WaitlistButton from "./WaitlistButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[4.5rem] md:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight text-text-primary md:text-2xl"
        >
          iTehYou
        </a>
        <WaitlistButton variant="nav">
          <span className="hidden sm:inline">Join the Waitlist</span>
          <span className="sm:hidden">Join Waitlist</span>
        </WaitlistButton>
      </nav>
    </header>
  );
}
