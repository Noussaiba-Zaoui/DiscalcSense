const KEYS = {
  read: "numsense_read",
  write: "numsense_write",
  math: "numsense_math",
};

const EMPTY_STATS = { correct: 0, total: 0, streak: 0, bestStreak: 0 };

export function getStats(moduleName) {
  try {
    const raw = localStorage.getItem(KEYS[moduleName]);
    return raw ? { ...EMPTY_STATS, ...JSON.parse(raw) } : EMPTY_STATS;
  } catch {
    return EMPTY_STATS;
  }
}

export function saveResult(moduleName, isCorrect) {
  const current = getStats(moduleName);
  const streak = isCorrect ? current.streak + 1 : 0;
  const next = {
    total: current.total + 1,
    correct: current.correct + (isCorrect ? 1 : 0),
    streak,
    bestStreak: Math.max(current.bestStreak, streak),
  };

  localStorage.setItem(KEYS[moduleName], JSON.stringify(next));
  return next;
}
