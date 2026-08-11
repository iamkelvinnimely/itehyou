export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            iTehYou
          </p>
          <p className="mt-2 text-text-secondary">
            African Music. Global Reach.
          </p>
        </div>

        <div className="text-sm text-text-secondary md:text-right">
          <p className="font-medium tracking-wide text-accent uppercase">
            Coming Soon
          </p>
          <p className="mt-2">© 2026 iTehYou. All rights reserved.</p>
          <p className="mt-3 text-text-secondary/90">
            Built by{" "}
            <span className="font-medium text-text-primary">Kelvin Nimely</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
