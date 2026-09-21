import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { calculators } from "@/lib/calculators";

export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-border text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60"
    >
      {label}
    </div>
  );
}

export function Result({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl bg-accent px-5 py-4">
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-accent-foreground/70">{label}</div>
      <div className="mt-1 font-display text-3xl font-semibold text-accent-foreground tabular-nums break-words">
        {value}
      </div>
      {hint ? <div className="mt-1 text-sm text-accent-foreground/70">{hint}</div> : null}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight">
          calc<span className="text-primary">.</span>studio
        </Link>
        <nav className="hidden gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/basic" className="transition-colors hover:text-foreground">Basic</Link>
          <Link to="/loan" className="transition-colors hover:text-foreground">Loan</Link>
          <Link to="/bmi" className="transition-colors hover:text-foreground">BMI</Link>
          <Link to="/unit-converter" className="transition-colors hover:text-foreground">Converter</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2 md:grid-cols-3">
          {calculators.map((c) => (
            <Link key={c.slug} to={c.to} className="transition-colors hover:text-foreground">
              {c.name}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} calc.studio — free online calculators.
        </p>
      </div>
    </footer>
  );
}

export function CalcPage({
  title,
  intro,
  steps,
  children,
}: {
  title: string;
  intro: string;
  steps: string[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pt-10">
        <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← All calculators
        </Link>
        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{intro}</p>
            <div className="mt-8 card-surface p-5 sm:p-7">{children}</div>
            <section className="mt-10">
              <h2 className="font-display text-xl font-semibold">How to use it</h2>
              <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-secondary-foreground">
                      {i + 1}
                    </span>
                    <span>{s}</span>
                  </li>
                ))}
              </ol>
            </section>
            <div className="mt-10">
              <AdSlot />
            </div>
          </div>
          <aside className="space-y-4">
            <AdSlot label="Sponsored" />
            <div className="card-surface p-5">
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                More calculators
              </h2>
              <div className="mt-3 grid gap-2 text-sm">
                {calculators.slice(0, 8).map((c) => (
                  <Link key={c.slug} to={c.to} className="text-muted-foreground transition-colors hover:text-foreground">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}