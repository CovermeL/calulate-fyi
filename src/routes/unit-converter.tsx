import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/unit-converter")({
  head: () =>
    meta(
      "Unit Converter — Length, Weight, Temperature & Volume | calc.studio",
      "Convert between metric and imperial units for length, weight, temperature and volume instantly.",
    ),
  component: ConverterPage,
});

type Cat = "Length" | "Weight" | "Temperature" | "Volume";

const factors: Record<Exclude<Cat, "Temperature">, Record<string, number>> = {
  Length: { Millimetre: 0.001, Centimetre: 0.01, Metre: 1, Kilometre: 1000, Inch: 0.0254, Foot: 0.3048, Yard: 0.9144, Mile: 1609.344 },
  Weight: { Gram: 0.001, Kilogram: 1, Tonne: 1000, Ounce: 0.0283495, Pound: 0.453592, Stone: 6.35029 },
  Volume: { Millilitre: 0.001, Litre: 1, "Cubic metre": 1000, "US cup": 0.236588, "US pint": 0.473176, "US gallon": 3.78541 },
};

const tempUnits = ["Celsius", "Fahrenheit", "Kelvin"];

function convertTemp(v: number, from: string, to: string) {
  const c = from === "Celsius" ? v : from === "Fahrenheit" ? ((v - 32) * 5) / 9 : v - 273.15;
  return to === "Celsius" ? c : to === "Fahrenheit" ? (c * 9) / 5 + 32 : c + 273.15;
}

function ConverterPage() {
  const [cat, setCat] = useState<Cat>("Length");
  const [value, setValue] = useState("1");
  const units = cat === "Temperature" ? tempUnits : Object.keys(factors[cat]);
  const [from, setFrom] = useState("Metre");
  const [to, setTo] = useState("Foot");

  const pickCat = (c: Cat) => {
    setCat(c);
    const u = c === "Temperature" ? tempUnits : Object.keys(factors[c]);
    setFrom(u[0]!);
    setTo(u[1] ?? u[0]!);
  };

  const n = Number(value);
  let out = NaN;
  if (Number.isFinite(n)) {
    if (cat === "Temperature") out = convertTemp(n, from, to);
    else {
      const f = factors[cat][from];
      const t = factors[cat][to];
      if (f && t) out = (n * f) / t;
    }
  }

  return (
    <CalcPage
      title="Unit Converter"
      intro="Convert length, weight, temperature and volume between metric and imperial units."
      steps={[
        "Pick a category: length, weight, temperature or volume.",
        "Type the value you want to convert.",
        "Choose the unit you are converting from and to.",
        "The converted value appears instantly below.",
      ]}
    >
      <div className="flex flex-wrap gap-2">
        {(["Length", "Weight", "Temperature", "Volume"] as Cat[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => pickCat(c)}
            className={`rounded-full border border-border px-4 py-1.5 text-sm transition-colors ${
              cat === c ? "bg-primary text-primary-foreground border-transparent" : "hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <Field label="Value">
          <input className="field-input" inputMode="decimal" value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Field label="From">
          <select className="field-input" value={from} onChange={(e) => setFrom(e.target.value)}>
            {units.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </Field>
        <Field label="To">
          <select className="field-input" value={to} onChange={(e) => setTo(e.target.value)}>
            {units.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-7">
        <Result
          label="Converted value"
          value={Number.isFinite(out) ? String(Number(out.toFixed(6))) : "—"}
          hint={`${value} ${from} → ${to}`}
        />
      </div>
    </CalcPage>
  );
}