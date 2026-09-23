import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";

export const Route = createFileRoute("/basic")({
  head: () =>
    meta(
      "Basic Calculator — Fast Online Arithmetic | Calulate.fyi",
      "A clean online basic calculator for addition, subtraction, multiplication, division and percentages. Works on desktop and mobile.",
      "/basic",
    ),
  component: BasicPage,
});

const keys = ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="];

function BasicPage() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  const apply = (a: number, b: number, o: string) =>
    o === "+" ? a + b : o === "−" ? a - b : o === "×" ? a * b : b === 0 ? NaN : a / b;

  const press = (k: string) => {
    if (k === "C") {
      setDisplay("0");
      setAcc(null);
      setOp(null);
      setFresh(true);
      return;
    }
    if (k === "±") return setDisplay((d) => (d.startsWith("-") ? d.slice(1) : d === "0" ? d : "-" + d));
    if (k === "%") return setDisplay((d) => String(Number(d) / 100));
    if (/[0-9]/.test(k)) {
      setDisplay((d) => (fresh || d === "0" ? k : d + k));
      setFresh(false);
      return;
    }
    if (k === ".") {
      setDisplay((d) => (fresh ? "0." : d.includes(".") ? d : d + "."));
      setFresh(false);
      return;
    }
    const current = Number(display);
    if (k === "=") {
      if (op !== null && acc !== null) {
        const r = apply(acc, current, op);
        setDisplay(Number.isFinite(r) ? String(Number(r.toFixed(10))) : "Error");
        setAcc(null);
        setOp(null);
      }
      setFresh(true);
      return;
    }
    const base = op !== null && acc !== null && !fresh ? apply(acc, current, op) : current;
    setAcc(Number.isFinite(base) ? base : 0);
    setDisplay(Number.isFinite(base) ? String(Number(base.toFixed(10))) : "Error");
    setOp(k);
    setFresh(true);
  };

  return (
    <CalcPage
      title="Basic Calculator"
      intro="Everyday arithmetic with a large, readable display. Tap or click the keys — results update instantly."
      steps={[
        "Enter your first number with the digit keys.",
        "Choose an operator: ÷, ×, − or +.",
        "Enter the second number, then press = to see the result.",
        "Press C to clear, ± to flip the sign, or % to divide by 100.",
      ]}
    >
      <div className="rounded-xl bg-secondary px-5 py-6 text-right font-display text-4xl font-semibold tabular-nums break-all sm:text-5xl">
        {display}
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        {keys.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => press(k)}
            className={`keypad-key ${k === "0" ? "col-span-2" : ""} ${
              k === "=" ? "bg-primary text-primary-foreground border-transparent hover:bg-primary" : ""
            }`}
          >
            {k}
          </button>
        ))}
      </div>
    </CalcPage>
  );
}