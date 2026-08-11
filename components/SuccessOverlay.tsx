"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { useWaitlist } from "./WaitlistProvider";

export default function SuccessOverlay() {
  const { showSuccess, dismissSuccess } = useWaitlist();
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!showSuccess) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissSuccess();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [showSuccess, dismissSuccess]);

  const share = useCallback(async () => {
    const shareData = {
      title: "iTehYou — African Music. Global Reach.",
      text: "I just joined the iTehYou waitlist — a new home for African music.",
      url: typeof window !== "undefined" ? window.location.origin : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      /* cancelled */
    }

    try {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  if (!showSuccess) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-label="Close dialog backdrop"
        onClick={dismissSuccess}
      />

      <div className="success-panel relative w-full max-w-md overflow-hidden border border-border bg-surface px-7 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:px-10 md:py-12">
        <div
          className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
          aria-hidden="true"
        />

        <p className="relative text-xs font-semibold tracking-[0.28em] text-accent uppercase">
          You&apos;re in
        </p>
        <h2
          id={titleId}
          className="relative mt-4 font-display text-3xl font-bold tracking-tight md:text-4xl"
        >
          You&apos;re on the list.
        </h2>
        <p className="relative mx-auto mt-4 max-w-sm text-base leading-relaxed text-text-secondary">
          Thanks for joining. We&apos;ll let you know when iTehYou launches —
          something new is being built for African music, and you&apos;re part of
          it.
        </p>

        <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
          >
            Share the moment
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={dismissSuccess}
            className="inline-flex items-center justify-center rounded-md border border-border px-5 py-3 text-sm font-medium text-text-primary transition-colors hover:border-accent/40 hover:bg-accent-muted"
          >
            Close
          </button>
        </div>

        <div
          className="relative mt-10 flex h-10 items-end justify-center gap-1"
          aria-hidden="true"
        >
          {[40, 70, 55, 90, 65, 100, 75, 85, 50, 95, 60].map((h, i) => (
            <span
              key={i}
              className="wave-bar w-1 rounded-full bg-accent/70"
              style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
