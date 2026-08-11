"use client";

import { useSound } from "./SoundProvider";

export default function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute ambient sound" : "Play ambient sound"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-md border border-border bg-surface/90 px-3 py-2 text-xs font-medium tracking-wide text-text-secondary backdrop-blur-md transition-colors hover:border-accent/40 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:bottom-8 md:right-8"
    >
      <span className="relative flex h-4 w-4 items-end justify-center gap-0.5" aria-hidden="true">
        {[0.45, 0.85, 0.55, 1].map((h, i) => (
          <span
            key={i}
            className={`w-0.5 rounded-full bg-current ${enabled ? "sound-bar" : ""}`}
            style={{
              height: `${h * 100}%`,
              animationDelay: enabled ? `${i * 0.12}s` : undefined,
              opacity: enabled ? 1 : 0.45,
            }}
          />
        ))}
      </span>
      <span className="uppercase tracking-[0.18em]">
        {enabled ? "Sound on" : "Sound off"}
      </span>
    </button>
  );
}
