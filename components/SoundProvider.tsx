"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return ctx;
}

/**
 * Soft warm ambient pad via Web Audio — no external audio file required.
 * Starts muted; user must opt in (autoplay policy + taste).
 */
export default function SoundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const startedRef = useRef(false);

  const ensureGraph = useCallback(async () => {
    let ctx = ctxRef.current;
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = new AC();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
      masterRef.current = master;

      const freqs = [110, 164.81, 220, 329.63];
      freqs.forEach((freq, i) => {
        const osc = ctx!.createOscillator();
        const gain = ctx!.createGain();
        const filter = ctx!.createBiquadFilter();
        osc.type = i % 2 === 0 ? "sine" : "triangle";
        osc.frequency.value = freq;
        filter.type = "lowpass";
        filter.frequency.value = 560;
        gain.gain.value = 0.045 - i * 0.007;
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(master);
        osc.start();
      });

      startedRef.current = true;
    }

    if (ctx.state === "suspended") {
      await ctx.resume();
    }
  }, []);

  const fadeTo = useCallback((value: number, seconds: number) => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(value, now + seconds);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (next) {
        void ensureGraph().then(() => fadeTo(0.2, 1.1));
      } else {
        fadeTo(0, 0.55);
      }
      return next;
    });
  }, [ensureGraph, fadeTo]);

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
    };
  }, []);

  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle]);

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}
