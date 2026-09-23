import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalcPage } from "@/components/site/CalcPage";
import { meta } from "@/lib/calculators";
import { evaluateExpression } from "@/lib/expression";

export const Route = createFileRoute("/scientific")({
  head: () =>
    meta(
      "Scientific Calculator — Trig, Logs & Powers Online | Calulate.fyi",
      "A free scientific calculator with sin, cos, tan, logarithms, powers, roots, π and e — type an expression and get the answer.",
      "/scientific",
    ),
  component: SciPage,
});

const rows: string[][] = [
  ["sin(", "cos(", "tan(", "ln(", "log("],
  ["√(", "^", "(", ")", "π"],
  ["7", "8", "9", "/", "e"],
  ["4", "5", "6", "*", "%"],
  ["1", "2", "3", "-", "!"],
  ["0", ".", "=", "+", "C"],
];

function SciPage() {
  const [expr, setExpr] = useState("");
  const [answer, setAnswer] = useState("0");

  const run = (value: string) => {
    const r = evaluateExpression(value);
    setAnswer(Number.isFinite(r) ? String(Number(r.toFixed(10))) : "Error");
  };

  const press = (k: string) => {
    if (k === "C") {
      setExpr("");
      setAnswer("0");
      return;
    }
    if (k === "=") return run(expr);
    setExpr((e) => e + k);
  };

  return (
    <CalcPage
      title="Scientific Calculator"
      intro="Type or tap a full expression — trigonometry, logarithms, powers, roots and constants included."
      steps={[
        "Build an expression in the input, e.g. sin(30) + 2^5.",
        "Angles for sin, cos and tan are entered in degrees.",
        "Use √( for square root, ^ for powers, ! for factorial, π and e for constants.",
        "Press = or Enter to evaluate, C to clear.",
      ]}
    >
      <div className="rounded-xl bg-secondary px-5 py-5">
        <input
          className="w-full bg-transparent text-right font-mono text-lg outline-none"
          value={expr}
          placeholder="sin(30) + 2^5"
          aria-label="Expression"
          onChange={(e) => setExpr(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") run(expr);
          }}
        />
        <div className="mt-3 text-right font-display text-4xl font-semibold tabular-nums break-all">{answer}</div>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {rows.flat().map((k, i) => (
          <button
            key={`${k}-${i}`}
            type="button"
            onClick={() => press(k)}
            className={`keypad-key text-base ${
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