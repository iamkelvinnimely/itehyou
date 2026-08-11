"use client";

import { useEffect, useRef } from "react";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** Scroll parallax intensity. Higher = more movement. */
  speed?: number;
};

/**
 * Lightweight scroll parallax. Respects prefers-reduced-motion.
 */
export default function Parallax({
  children,
  className = "",
  speed = 0.25,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const update = () => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const centerOffset = rect.top + rect.height / 2 - viewH / 2;
      const y = centerOffset * speed * -1;
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
