const LEVEL_RANGES = [
  [100, 999],
  [1000, 9999],
  [10000, 99999],
  [100000, 999999],
];

const SMALL_WORDS = [
  "zero",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
];

const TENS_WORDS = {
  20: "vingt",
  30: "trente",
  40: "quarante",
  50: "cinquante",
  60: "soixante",
};

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateNumber(level = 1) {
  const [min, max] = LEVEL_RANGES[Math.min(level - 1, LEVEL_RANGES.length - 1)];
  return randomInt(min, max);
}

export function formatNumber(value) {
  return value.toLocaleString("fr-FR");
}

export function parseNumberInput(value) {
  const clean = value.replace(/\s/g, "");
  if (!/^\d+$/.test(clean)) return null;
  return Number(clean);
}

export function normalizeWords(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function numberToFrenchWords(value) {
  if (value < 0) return `moins ${numberToFrenchWords(Math.abs(value))}`;
  if (value < 17) return SMALL_WORDS[value];
  if (value < 20) return `dix-${SMALL_WORDS[value - 10]}`;
  if (value < 70) return underHundred(value);
  if (value < 80) return value === 71 ? "soixante et onze" : `soixante-${numberToFrenchWords(value - 60)}`;
  if (value < 100) return value === 80 ? "quatre-vingts" : `quatre-vingt-${numberToFrenchWords(value - 80)}`;
  if (value < 1000) return underThousand(value);
  if (value < 1000000) return withScale(value, 1000, "mille");

  return withScale(value, 1000000, "million");
}

export function createReadingChoices(answer, count = 4) {
  const choices = new Set([numberToFrenchWords(answer)]);
  const digits = String(answer).length;
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;

  while (choices.size < count) {
    const offset = randomInt(3, 80) * (Math.random() > 0.5 ? 1 : -1);
    const candidate = Math.min(max, Math.max(min, answer + offset));
    if (candidate !== answer) choices.add(numberToFrenchWords(candidate));
  }

  return shuffle([...choices]);
}

function underHundred(value) {
  if (TENS_WORDS[value]) return TENS_WORDS[value];

  const tens = Math.floor(value / 10) * 10;
  const ones = value % 10;
  const joiner = ones === 1 ? " et " : "-";
  return `${TENS_WORDS[tens]}${joiner}${SMALL_WORDS[ones]}`;
}

function underThousand(value) {
  const hundreds = Math.floor(value / 100);
  const rest = value % 100;
  const hundredText = hundreds === 1 ? "cent" : `${SMALL_WORDS[hundreds]} cent`;
  const plural = rest === 0 && hundreds > 1 ? "s" : "";

  return rest === 0 ? `${hundredText}${plural}` : `${hundredText} ${numberToFrenchWords(rest)}`;
}

function withScale(value, scale, label) {
  const head = Math.floor(value / scale);
  const rest = value % scale;
  const headText = scale === 1000 && head === 1 ? label : `${numberToFrenchWords(head)} ${label}${head > 1 && scale !== 1000 ? "s" : ""}`;

  return rest === 0 ? headText : `${headText} ${numberToFrenchWords(rest)}`;
}

function shuffle(values) {
  return [...values].sort(() => Math.random() - 0.5);
}
