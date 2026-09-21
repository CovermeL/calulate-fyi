// Tiny safe expression evaluator: shunting-yard style recursive descent.
// Supports + - * / % ^ ! parentheses, sin/cos/tan (degrees), ln, log, √, π, e.

export function evaluateExpression(input: string): number {
  const src = input
    .replace(/π/g, "(3.141592653589793)")
    .replace(/(?<![a-z])e(?![a-z(])/g, "(2.718281828459045)")
    .replace(/√/g, "sqrt")
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/\s+/g, "");

  let i = 0;

  const peek = () => src[i];

  function parseExpr(): number {
    let left = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = src[i++];
      const right = parseTerm();
      left = op === "+" ? left + right : left - right;
    }
    return left;
  }

  function parseTerm(): number {
    let left = parseUnary();
    while (peek() === "*" || peek() === "/" || peek() === "%") {
      const op = src[i++];
      const right = parseUnary();
      left = op === "*" ? left * right : op === "/" ? left / right : left % right;
    }
    return left;
  }

  function parseUnary(): number {
    if (peek() === "-") {
      i++;
      return -parseUnary();
    }
    if (peek() === "+") {
      i++;
      return parseUnary();
    }
    return parsePower();
  }

  function parsePower(): number {
    const base = parsePostfix();
    if (peek() === "^") {
      i++;
      return Math.pow(base, parseUnary());
    }
    return base;
  }

  function factorial(n: number): number {
    if (n < 0 || !Number.isInteger(n) || n > 170) return NaN;
    let r = 1;
    for (let k = 2; k <= n; k++) r *= k;
    return r;
  }

  function parsePostfix(): number {
    let v = parsePrimary();
    while (peek() === "!") {
      i++;
      v = factorial(v);
    }
    return v;
  }

  const fns: Record<string, (n: number) => number> = {
    sin: (n) => Math.sin((n * Math.PI) / 180),
    cos: (n) => Math.cos((n * Math.PI) / 180),
    tan: (n) => Math.tan((n * Math.PI) / 180),
    ln: Math.log,
    log: Math.log10,
    sqrt: Math.sqrt,
    abs: Math.abs,
  };

  function parsePrimary(): number {
    const ch = peek();
    if (ch === undefined) return NaN;
    if (ch === "(") {
      i++;
      const v = parseExpr();
      if (peek() === ")") i++;
      return v;
    }
    const nameMatch = /^[a-z]+/.exec(src.slice(i));
    if (nameMatch) {
      const name = nameMatch[0];
      i += name.length;
      const fn = fns[name];
      if (!fn) return NaN;
      if (peek() === "(") {
        i++;
        const arg = parseExpr();
        if (peek() === ")") i++;
        return fn(arg);
      }
      return fn(parseUnary());
    }
    const numMatch = /^\d*\.?\d+/.exec(src.slice(i));
    if (numMatch) {
      i += numMatch[0].length;
      return parseFloat(numMatch[0]);
    }
    return NaN;
  }

  if (!src) return NaN;
  const result = parseExpr();
  return i === src.length ? result : NaN;
}