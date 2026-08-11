import Image from "next/image";
import Reveal from "./Reveal";
import Parallax from "./Parallax";

const features = [
  {
    label: "Discover",
    title: "Music without borders.",
    body: "Discover emerging voices, established artists, and sounds from across Africa and beyond.",
    image: "/images/performance.jpg",
    alt: "Performer under stage lights",
  },
  {
    label: "Connect",
    title: "Artists and audiences, closer.",
    body: "Create meaningful connections between artists and the people who love their music.",
    image: "/images/crowd.jpg",
    alt: "Crowd reaching toward the stage",
  },
  {
    label: "Grow",
    title: "Built for ambitious artists.",
    body: "A future designed to help African artists build audiences and take their music further.",
    image: "/images/studio.jpg",
    alt: "Recording studio mixing console",
  },
];

export default function FeatureSection() {
  return (
    <section
      className="border-t border-border bg-background px-5 py-24 md:px-8 md:py-32"
      aria-labelledby="value-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-accent uppercase md:text-sm">
            Built for the next generation
          </p>
          <h2
            id="value-heading"
            className="max-w-3xl font-display text-3xl leading-[1.1] font-bold tracking-tight md:text-5xl"
          >
            African artists deserve a global stage.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            From emerging independent artists to established creators, we&apos;re
            building a platform designed to make discovering, sharing, and
            experiencing African music easier for everyone.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-8">
          {features.map((feature, i) => (
            <Reveal key={feature.label} delayMs={i * 120}>
              <article className="group">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden">
                  <Parallax speed={0.12} className="absolute inset-[-15%] h-[130%] w-full">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <span className="absolute bottom-4 left-4 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                    {feature.label}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-secondary">
                  {feature.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
