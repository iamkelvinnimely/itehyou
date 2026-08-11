import Image from "next/image";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import WaitlistButton from "./WaitlistButton";

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-border"
      aria-labelledby="final-cta-heading"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Parallax speed={0.3} className="absolute inset-[-15%] h-[130%] w-full">
          <Image
            src="/images/performance.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </Parallax>
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(232,165,75,0.16)_0%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center md:px-8 md:py-36">
        <Reveal>
          <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-accent uppercase md:text-sm">
            Join the movement
          </p>
          <h2
            id="final-cta-heading"
            className="font-display text-3xl leading-[1.1] font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Be part of what&apos;s next.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
            We&apos;re building something for the future of African music. Get
            early access and follow the journey from day one.
          </p>
          <div className="mt-10">
            <WaitlistButton className="min-w-[220px] px-8 py-3.5 text-base" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
