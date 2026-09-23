import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage, Field, Result } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/loan")({
  head: () =>
    meta(
      "Loan Calculator — Monthly Payment & Total Interest | Calulate.fyi",
      "Estimate the monthly payment, total interest and total cost of a personal, car or student loan.",
      "/loan",
    ),
  component: LoanPage,
});

export function monthlyPayment(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 100 / 12;
  if (!Number.isFinite(n) || n <= 0) return NaN;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

const money = (n: number) =>
  Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : "—";

function LoanPage() {
  const [amount, setAmount] = useState("20000");
  const [rate, setRate] = useState("7.5");
  const [years, setYears] = useState("5");

  const pay = monthlyPayment(Number(amount), Number(rate), Number(years));
  const total = pay * Number(years) * 12;
  const interest = total - Number(amount);

  return (
    <CalcPage
      title="Loan Calculator"
      intro="See what a fixed-rate loan really costs each month and over its full term."
      steps={[
        "Enter the amount you plan to borrow.",
        "Add the annual interest rate (APR) offered to you.",
        "Set the loan term in years.",
        "Compare the monthly payment against your budget before committing.",
      ]}
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Loan amount">
          <input className="field-input" inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </Field>
        <Field label="Annual rate (%)">
          <input className="field-input" inputMode="decimal" value={rate} onChange={(e) => setRate(e.target.value)} />
        </Field>
        <Field label="Term (years)">
          <input className="field-input" inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
        </Field>
      </div>
      <div className="mt-7 grid gap-3 sm:grid-cols-3">
        <Result label="Monthly payment" value={money(pay)} />
        <Result label="Total interest" value={money(interest)} />
        <Result label="Total repaid" value={money(total)} />
      </div>
    </CalcPage>
  );
}