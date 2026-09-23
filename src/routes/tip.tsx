import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/tip")({
  head: () =>
    meta(
      "Tip Calculator — Split a Bill Fairly | Calulate.fyi",
      "Calculate tip amount, total bill and the per-person share for any group size and tip percentage.",
      "/tip",
    ),
  component: TipPage,
});

const money = (n: number) => (Number.isFinite(n) ? n.toFixed(2) : "—");

function TipPage() {
  const [bill, setBill] = useState("60");
  const [pct, setPct] = useState(18);
  const [people, setPeople] = useState("2");

  const tip = (Number(bill) * pct) / 100;
  const total = Number(bill) + tip;
  const each = total / Math.max(1, Number(people));

  return (
    <CalcPage
      title="Tip Calculator"
      intro="Enter the bill, pick a tip percentage and split it across the table."
      steps={[
        "Type the bill amount before tip.",
        "Drag the slider or tap a preset to set the tip percentage.",
        "Set how many people are splitting the bill.",
        "Read the tip, total and per-person amounts below.",
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Bill amount">
          <input className="field-input" inputMode="decimal" value={bill} onChange={(e) => setBill(e.target.value)} />
        </Field>
        <Field label="Number of people">
          <input className="field-input" inputMode="numeric" value={people} onChange={(e) => setPeople(e.target.value)} />
        </Field>
      </div>

      <div className="mt-6">
        <span className="field-label">Tip: {pct}%</span>
        <input
          type="range"
          min={0}
          max={40}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          className="w-full accent-primary"
          aria-label="Tip percentage"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {[10, 15, 18, 20, 25].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setPct(v)}
              className={`rounded-full border border-border px-4 py-1.5 text-sm transition-colors ${
                pct === v ? "bg-primary text-primary-foreground border-transparent" : "hover:bg-secondary"
              }`}
            >
              {v}%
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Result label="Tip" value={money(tip)} />
        <Result label="Total" value={money(total)} />
        <Result label="Each person" value={money(each)} />
      </div>
    </CalcPage>
  );
}