import Image from "next/image";
import Reveal from "./Reveal";
import Parallax from "./Parallax";
import WaitlistButton from "./WaitlistButton";

const benefits = [
  {
    title: "Early access",
    body: "Be among the first to experience the platform.",
  },
  {
    title: "Launch updates",
    body: "Follow the journey from idea to launch.",
  },
  {
    title: "First look",
    body: "Get early access to announcements and new features.",
  },
  {
    title: "Community access",
    body: "Join a growing community built around African music.",
  },
];

export default function WaitlistSection() {
  return (
    <section
      className="border-t border-border bg-background px-5 py-24 md:px-8 md:py-32"
      aria-labelledby="waitlist-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <Reveal>
            <h2
              id="waitlist-heading"
              className="font-display text-3xl leading-[1.1] font-bold tracking-tight md:text-5xl"
            >
              Get in early.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
              Join the waitlist and be part of the community shaping the future
              of African music.
            </p>

            <ul className="mt-12 space-y-8">
              {benefits.map((item) => (
                <li key={item.title} className="border-l-2 border-accent/40 pl-5">
                  <p className="font-display text-lg font-bold tracking-tight">
                    {item.title}
                  </p>
                  <p className="mt-1 text-text-secondary">{item.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12">
              <WaitlistButton />
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="relative overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Parallax speed={0.18} className="absolute inset-[-18%] h-[136%] w-full">
                  <Image
                    src="/images/crowd.jpg"
                    alt="Audience at a live music event"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-xs font-semibold tracking-[0.28em] text-accent uppercase">
                  Built from Africa
                </p>
                <p className="mt-3 font-display text-2xl leading-[1.15] font-bold tracking-tight md:text-3xl">
                  Made for the world.
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-text-secondary md:text-base">
                  We&apos;re building a new home for African music — starting
                  with the artists, creators, and listeners who make the culture
                  move.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
