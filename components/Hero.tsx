"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import WaitlistButton from "./WaitlistButton";
import Parallax from "./Parallax";
import { useSound } from "./SoundProvider";

function Waveform({ active }: { active: boolean }) {
  const bars = [40, 70, 55, 90, 65, 100, 75, 85, 50, 95, 60, 80, 45, 70, 55];

  return (
    <div
      className="flex h-24 items-end justify-start gap-1.5 md:h-32 md:gap-2"
      aria-hidden="true"
    >
      {bars.map((height, i) => (
        <span
          key={i}
          className={`w-1.5 rounded-full bg-accent/80 md:w-2 ${active ? "wave-bar" : ""}`}
          style={{
            height: `${height}%`,
            animationDelay: active ? `${i * 0.08}s` : undefined,
            opacity: active ? 1 : 0.35,
            transform: active ? undefined : "scaleY(0.35)",
            transformOrigin: "center bottom",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { enabled: soundOn } = useSound();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.removeAttribute("autoplay");
      video.pause();
      return;
    }

    const play = () => {
      video.play().catch(() => {
        /* autoplay blocked — poster image remains */
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <Parallax speed={0.35} className="absolute inset-[-12%] h-[124%] w-full">
          {/* Photo fallback / LCP */}
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ${
              videoReady ? "opacity-0" : "ken-burns-img opacity-100"
            }`}
          />
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero.jpg"
            onLoadedData={() => setVideoReady(true)}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(232,165,75,0.14)_0%,transparent_60%)]" />
        <div className="hero-pattern absolute inset-0 opacity-50" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
        <p className="animate-fade-rise mb-5 text-xs font-semibold tracking-[0.28em] text-accent uppercase md:mb-6 md:text-sm">
          Coming Soon
        </p>

        <p className="animate-fade-rise-delay-1 mb-4 font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:mb-6 md:text-7xl lg:text-8xl">
          iTehYou
        </p>

        <h1
          id="hero-heading"
          className="animate-fade-rise-delay-2 max-w-3xl font-display text-3xl leading-[1.05] font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl"
        >
          African Music.
          <br />
          Global Reach.
        </h1>

        <p className="animate-fade-rise-delay-3 mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:mt-8 md:text-lg">
          A new platform built to help African artists share their music, connect
          with listeners, and reach audiences around the world.
        </p>

        <div className="animate-fade-rise-delay-4 mt-8 flex flex-col items-start gap-3 md:mt-10">
          <WaitlistButton className="min-w-[200px]" />
          <p className="text-sm text-text-secondary">
            Be among the first to experience it.
          </p>
        </div>

        <div className="animate-fade-rise-delay-4 mt-14 max-w-md opacity-90 md:mt-16">
          <Waveform active={soundOn} />
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="text-[10px] font-semibold tracking-[0.25em] text-text-secondary uppercase">
          Scroll
        </span>
        <span className="scroll-cue h-8 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
