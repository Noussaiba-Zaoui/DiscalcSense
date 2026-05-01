import { formatNumber, randomInt } from "./numbers";

const OPERATIONS = ["add", "subtract"];

export function generateMathProblem(level = 1) {
  const operation = OPERATIONS[randomInt(0, OPERATIONS.length - 1)];
  const max = level === 1 ? 99 : 999;
  const min = level === 1 ? 10 : 100;

  if (operation === "add") {
    const a = randomInt(min, max);
    const b = randomInt(min, max);
    return { a, b, operator: "+", answer: a + b };
  }

  const a = randomInt(min + 10, max);
  const b = randomInt(min, a - 1);
  return { a, b, operator: "-", answer: a - b };
}

export function formatMathProblem(problem) {
  return `${formatNumber(problem.a)} ${problem.operator} ${formatNumber(problem.b)}`;
}
