import { createFileRoute, Link } from "@tanstack/react-router";
import { calculators, groups, meta } from "@/lib/calculators";
import { AdSlot, SiteFooter, SiteHeader } from "@/components/site/CalcPage";

export const Route = createFileRoute("/")({
  head: () =>
    meta(
      "Free Online Calculators — Calulate.fyi",
      "Eleven fast, minimalist calculators: basic, scientific, percentage, tip, age, BMI, date, time duration, loan, mortgage and unit conversion.",
      "/",
    ),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5">
        <section className="border-b border-border py-16 sm:py-24">
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Calculators that get out of the way.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Eleven precise tools for math, money, health and time. No sign-up, no clutter, instant results.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/basic"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open basic calculator
            </Link>
            <Link
              to="/loan"
              className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Loan payment
            </Link>
          </div>
        </section>

        <div className="py-10">
          <AdSlot />
        </div>

        {groups.map((group) => (
          <section key={group} className="pb-14">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {group}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {calculators
                .filter((c) => c.group === group)
                .map((c) => (
                  <Link
                    key={c.slug}
                    to={c.to}
                    className="card-surface group p-6 transition-shadow hover:shadow-[0_8px_30px_-12px_color-mix(in_oklab,var(--foreground)_25%,transparent)]"
                  >
                    <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>
                    <span className="mt-4 inline-block text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                      Open →
                    </span>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
