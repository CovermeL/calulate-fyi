import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/age")({
  head: () =>
    meta(
      "Age Calculator — Exact Age in Years, Months, Days | Calulate.fyi",
      "Find your exact age from a date of birth, plus total days lived and days until your next birthday.",
      "/age",
    ),
  component: AgePage,
});

function AgePage() {
  const [dob, setDob] = useState("1995-06-15");
  const [on, setOn] = useState(() => new Date().toISOString().slice(0, 10));

  const start = new Date(dob);
  const end = new Date(on);
  const valid = !isNaN(start.getTime()) && !isNaN(end.getTime()) && end >= start;

  let years = 0,
    months = 0,
    days = 0,
    totalDays = 0,
    untilBirthday = 0;

  if (valid) {
    years = end.getFullYear() - start.getFullYear();
    months = end.getMonth() - start.getMonth();
    days = end.getDate() - start.getDate();
    if (days < 0) {
      months -= 1;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    totalDays = Math.floor((end.getTime() - start.getTime()) / 86400000);
    let next = new Date(end.getFullYear(), start.getMonth(), start.getDate());
    if (next < end) next = new Date(end.getFullYear() + 1, start.getMonth(), start.getDate());
    untilBirthday = Math.ceil((next.getTime() - end.getTime()) / 86400000);
  }

  return (
    <CalcPage
      title="Age Calculator"
      intro="Work out an exact age on any date — useful for forms, eligibility checks and birthdays."
      steps={[
        "Pick the date of birth.",
        "Optionally change the “age at” date; it defaults to today.",
        "Read the exact age in years, months and days below.",
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date of birth">
          <input type="date" className="field-input" value={dob} onChange={(e) => setDob(e.target.value)} />
        </Field>
        <Field label="Age at date">
          <input type="date" className="field-input" value={on} onChange={(e) => setOn(e.target.value)} />
        </Field>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Result label="Exact age" value={valid ? `${years}y ${months}m ${days}d` : "—"} />
        <Result label="Total days" value={valid ? totalDays.toLocaleString() : "—"} />
        <Result label="Next birthday in" value={valid ? `${untilBirthday} days` : "—"} />
      </div>
    </CalcPage>
  );
}