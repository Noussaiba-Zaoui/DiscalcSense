export function Feedback({ result, correctAnswer }) {
  if (!result) {
    return (
      <p className="feedback feedback-neutral" aria-live="polite">
        Take your time. There is no countdown.
      </p>
    );
  }

  if (result === "correct") {
    return (
      <p className="feedback feedback-correct" aria-live="polite">
        Correct. Nicely done.
      </p>
    );
  }

  return (
    <p className="feedback feedback-incorrect" aria-live="polite">
      Not quite. The answer is <strong>{correctAnswer}</strong>.
    </p>
  );
}
