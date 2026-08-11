import Image from "next/image";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

const steps = [
  {
    number: "01",
    title: "Discover",
    body: "Explore music and artists from across Africa.",
  },
  {
    number: "02",
    title: "Connect",
    body: "Follow the artists and sounds you love.",
  },
  {
    number: "03",
    title: "Go Global",
    body: "Give African music a bigger stage.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden border-t border-border bg-surface"
      aria-labelledby="how-heading"
    >
      {/* Parallax ambient image band */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden="true">
        <Parallax speed={0.2} className="absolute inset-[-20%] h-[140%] w-full">
          <Image
            src="/images/vinyl.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-surface/80" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-accent uppercase md:text-sm">
            The future is coming
          </p>
          <h2
            id="how-heading"
            className="max-w-2xl font-display text-3xl leading-[1.1] font-bold tracking-tight md:text-5xl"
          >
            One platform.
            <br />
            A world of music.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-12">
          {steps.map((step, i) => (
            <Reveal key={step.number} delayMs={i * 100}>
              <li className="relative border-t border-border/80 pt-8">
                <span
                  className="font-display text-5xl font-extrabold text-accent/30 md:text-6xl"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {step.body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
