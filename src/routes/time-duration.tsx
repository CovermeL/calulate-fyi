import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/time-duration")({
  head: () =>
    meta(
      "Time Duration Calculator — Hours Between Two Times | Calulate.fyi",
      "Work out the hours and minutes between a start and end time, with optional break deduction and decimal hours.",
      "/time-duration",
    ),
  component: DurationPage,
});

function toMinutes(t: string) {
  const parts = t.split(":").map(Number);
  const h = parts[0] ?? NaN;
  const m = parts[1] ?? NaN;
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : NaN;
}

function DurationPage() {
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("17:30");
  const [breakMin, setBreakMin] = useState("30");

  let mins = toMinutes(end) - toMinutes(start);
  if (mins < 0) mins += 24 * 60;
  mins -= Number(breakMin) || 0;
  const valid = Number.isFinite(mins);
  const h = Math.floor(Math.abs(mins) / 60);
  const m = Math.abs(mins) % 60;

  return (
    <CalcPage
      title="Time Duration Calculator"
      intro="Measure elapsed time between two clock times — handy for shifts, timesheets and billing."
      steps={[
        "Enter the start and end time in 24-hour or local format.",
        "Overnight spans are handled automatically (end earlier than start rolls to the next day).",
        "Add unpaid break minutes to deduct them from the total.",
        "Use the decimal hours figure for payroll or invoicing.",
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Start time">
          <input type="time" className="field-input" value={start} onChange={(e) => setStart(e.target.value)} />
        </Field>
        <Field label="End time">
          <input type="time" className="field-input" value={end} onChange={(e) => setEnd(e.target.value)} />
        </Field>
        <Field label="Break (minutes)">
          <input className="field-input" inputMode="numeric" value={breakMin} onChange={(e) => setBreakMin(e.target.value)} />
        </Field>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Result label="Duration" value={valid ? `${mins < 0 ? "-" : ""}${h}h ${m}m` : "—"} />
        <Result label="Decimal hours" value={valid ? (mins / 60).toFixed(2) : "—"} />
        <Result label="Total minutes" value={valid ? String(mins) : "—"} />
      </div>
    </CalcPage>
  );
}