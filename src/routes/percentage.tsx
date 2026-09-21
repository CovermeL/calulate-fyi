import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/percentage")({
  head: () =>
    meta(
      "Percentage Calculator — Percent Of, Change & Share | calc.studio",
      "Work out what X% of a number is, the percentage change between two values, and what share one number is of another.",
    ),
  component: PercentPage,
});

function fmt(n: number) {
  return Number.isFinite(n) ? String(Number(n.toFixed(4))) : "—";
}

function PercentPage() {
  const [p, setP] = useState("15");
  const [of, setOf] = useState("200");
  const [a, setA] = useState("50");
  const [b, setB] = useState("75");
  const [x, setX] = useState("25");
  const [y, setY] = useState("80");

  const change = ((Number(b) - Number(a)) / Number(a)) * 100;

  return (
    <CalcPage
      title="Percentage Calculator"
      intro="Three common percentage questions, answered as you type."
      steps={[
        "Use the first block for “what is X% of Y”.",
        "Use the second block to find percentage increase or decrease between an old and a new value.",
        "Use the third block to see what share one number is of another.",
      ]}
    >
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold">What is X% of Y?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Percentage (%)">
              <input className="field-input" inputMode="decimal" value={p} onChange={(e) => setP(e.target.value)} />
            </Field>
            <Field label="Of value">
              <input className="field-input" inputMode="decimal" value={of} onChange={(e) => setOf(e.target.value)} />
            </Field>
          </div>
          <Result label="Result" value={fmt((Number(p) / 100) * Number(of))} />
        </section>

        <section className="space-y-4 border-t border-border pt-8">
          <h2 className="font-display text-lg font-semibold">Percentage change</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Original value">
              <input className="field-input" inputMode="decimal" value={a} onChange={(e) => setA(e.target.value)} />
            </Field>
            <Field label="New value">
              <input className="field-input" inputMode="decimal" value={b} onChange={(e) => setB(e.target.value)} />
            </Field>
          </div>
          <Result
            label={change >= 0 ? "Increase" : "Decrease"}
            value={`${fmt(Math.abs(change))}%`}
            hint={`From ${a} to ${b}`}
          />
        </section>

        <section className="space-y-4 border-t border-border pt-8">
          <h2 className="font-display text-lg font-semibold">X is what percent of Y?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Value X">
              <input className="field-input" inputMode="decimal" value={x} onChange={(e) => setX(e.target.value)} />
            </Field>
            <Field label="Value Y">
              <input className="field-input" inputMode="decimal" value={y} onChange={(e) => setY(e.target.value)} />
            </Field>
          </div>
          <Result label="Share" value={`${fmt((Number(x) / Number(y)) * 100)}%`} />
        </section>
      </div>
    </CalcPage>
  );
}