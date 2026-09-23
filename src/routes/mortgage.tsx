import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/mortgage")({
  head: () =>
    meta(
      "Mortgage Calculator — Home Loan Payment Estimate | Calulate.fyi",
      "Estimate a monthly mortgage payment including principal, interest, property tax and home insurance.",
      "/mortgage",
    ),
  component: MortgagePage,
});

function pAndI(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (n <= 0) return NaN;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : "—";

function MortgagePage() {
  const [price, setPrice] = useState("350000");
  const [down, setDown] = useState("70000");
  const [rate, setRate] = useState("6.25");
  const [years, setYears] = useState("30");
  const [tax, setTax] = useState("3600");
  const [ins, setIns] = useState("1200");

  const principal = Math.max(0, Number(price) - Number(down));
  const base = pAndI(principal, Number(rate), Number(years));
  const extras = (Number(tax) + Number(ins)) / 12;
  const totalMonthly = base + extras;
  const totalInterest = base * Number(years) * 12 - principal;

  return (
    <CalcPage
      title="Mortgage Calculator"
      intro="A full monthly housing estimate: principal and interest plus property tax and insurance."
      steps={[
        "Enter the home price and your down payment.",
        "Add the mortgage interest rate and term.",
        "Include yearly property tax and home insurance for a realistic total.",
        "The monthly figure shown is your estimated all-in payment.",
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Home price">
          <input className="field-input" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
        </Field>
        <Field label="Down payment">
          <input className="field-input" inputMode="decimal" value={down} onChange={(e) => setDown(e.target.value)} />
        </Field>
        <Field label="Interest rate (%)">
          <input className="field-input" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Term (years)">
          <input className="field-input" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
        <Field label="Property tax / year">
          <input className="field-input" inputMode="decimal" value={tax} onChange={(e) => setTax(e.target.value)} />
        </Field>
        <Field label="Home insurance / year">
          <input className="field-input" inputMode="decimal" value={ins} onChange={(e) => setIns(e.target.value)} />
        </Field>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Result label="Monthly total" value={money(totalMonthly)} hint={`Incl. ${money(extras)} tax & insurance`} />
        <Result label="Principal & interest" value={money(base)} />
        <Result label="Total interest" value={money(totalInterest)} />
      </div>
    </CalcPage>
  );
}