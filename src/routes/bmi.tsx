import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/bmi")({
  head: () =>
    meta(
      "BMI Calculator — Metric & Imperial Body Mass Index | Calulate.fyi",
      "Calculate body mass index from height and weight in metric or imperial units, with the standard BMI category.",
      "/bmi",
    ),
  component: BmiPage,
});

function category(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

function BmiPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [cm, setCm] = useState("175");
  const [kg, setKg] = useState("70");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const [lb, setLb] = useState("155");

  const meters = unit === "metric" ? Number(cm) / 100 : (Number(ft) * 12 + Number(inch)) * 0.0254;
  const kilos = unit === "metric" ? Number(kg) : Number(lb) * 0.453592;
  const bmi = kilos / (meters * meters);

  return (
    <CalcPage
      title="BMI Calculator"
      intro="Body mass index compares weight to height. It is a rough screening tool, not a diagnosis."
      steps={[
        "Choose metric or imperial units.",
        "Enter your height and weight.",
        "Read your BMI value and category below.",
        "Discuss anything unexpected with a healthcare professional.",
      ]}
    >
      <div className="inline-flex rounded-lg border border-border p-1">
        {(["metric", "imperial"] as const).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUnit(u)}
            className={`rounded-md px-4 py-1.5 text-sm capitalize transition-colors ${
              unit === u ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {u}
          </button>
        ))}
      </div>

      {unit === "metric" ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Height (cm)">
            <input className="field-input" inputMode="decimal" value={cm} onChange={(e) => setCm(e.target.value)} />
          </Field>
          <Field label="Weight (kg)">
            <input className="field-input" inputMode="decimal" value={kg} onChange={(e) => setKg(e.target.value)} />
          </Field>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          <Field label="Height (ft)">
            <input className="field-input" inputMode="numeric" value={ft} onChange={(e) => setFt(e.target.value)} />
          </Field>
          <Field label="Height (in)">
            <input className="field-input" inputMode="numeric" value={inch} onChange={(e) => setInch(e.target.value)} />
          </Field>
          <Field label="Weight (lb)">
            <input className="field-input" inputMode="decimal" value={lb} onChange={(e) => setLb(e.target.value)} />
          </Field>
        </div>
      )}

      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        <Result label="BMI" value={Number.isFinite(bmi) && bmi > 0 ? bmi.toFixed(1) : "—"} />
        <Result label="Category" value={Number.isFinite(bmi) && bmi > 0 ? category(bmi) : "—"} hint="18.5–24.9 is the healthy range" />
      </div>
    </CalcPage>
  );
}