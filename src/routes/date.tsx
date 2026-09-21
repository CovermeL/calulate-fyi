import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/date")({
  head: () =>
    meta(
      "Date Calculator — Days Between Dates & Date Math | calc.studio",
      "Count the days, weeks and months between two dates, or add and subtract days from any date.",
    ),
  component: DatePage,
});

function DatePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [base, setBase] = useState(today);
  const [offset, setOffset] = useState("30");

  const d1 = new Date(from);
  const d2 = new Date(to);
  const diffDays = Math.round((d2.getTime() - d1.getTime()) / 86400000);
  const valid = !isNaN(diffDays);

  const shifted = new Date(base);
  shifted.setDate(shifted.getDate() + (Number(offset) || 0));
  const shiftedValid = !isNaN(shifted.getTime());

  return (
    <CalcPage
      title="Date Calculator"
      intro="Count the gap between two dates, or shift a date forward and backward by a number of days."
      steps={[
        "Pick a start and end date to count the days between them.",
        "Negative results mean the end date is earlier than the start date.",
        "In the second block, enter a positive number to add days or a negative number to subtract them.",
      ]}
    >
      <section className="space-y-4">
        <h2 className="font-display text-lg font-semibold">Days between two dates</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Start date">
            <input type="date" className="field-input" value={from} onChange={(e) => setFrom(e.target.value)} />
          </Field>
          <Field label="End date">
            <input type="date" className="field-input" value={to} onChange={(e) => setTo(e.target.value)} />
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Result label="Days" value={valid ? String(diffDays) : "—"} />
          <Result label="Weeks" value={valid ? (diffDays / 7).toFixed(2) : "—"} />
          <Result label="Months (approx)" value={valid ? (diffDays / 30.44).toFixed(2) : "—"} />
        </div>
      </section>

      <section className="mt-8 space-y-4 border-t border-border pt-8">
        <h2 className="font-display text-lg font-semibold">Add or subtract days</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Base date">
            <input type="date" className="field-input" value={base} onChange={(e) => setBase(e.target.value)} />
          </Field>
          <Field label="Days to add (use − to subtract)">
            <input className="field-input" inputMode="numeric" value={offset} onChange={(e) => setOffset(e.target.value)} />
          </Field>
        </div>
        <Result
          label="Resulting date"
          value={
            shiftedValid
              ? shifted.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })
              : "—"
          }
        />
      </section>
    </CalcPage>
  );
}