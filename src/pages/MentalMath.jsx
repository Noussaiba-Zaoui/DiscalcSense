import { useState } from "react";
import { Button } from "../components/Button";
import { ExerciseCard } from "../components/ExerciseCard";
import { Feedback } from "../components/Feedback";
import { PageShell } from "../components/Layout";
import { NumberPrompt } from "../components/NumberPrompt";
import { TextInput } from "../components/TextInput";
import { formatMathProblem, generateMathProblem } from "../utils/math";
import { formatNumber, parseNumberInput } from "../utils/numbers";
import { getStats, saveResult } from "../utils/storage";

export default function MentalMath({ onBack }) {
  const [problem, setProblem] = useState(() => generateMathProblem(1));
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(() => getStats("math"));

  function checkAnswer(event) {
    event.preventDefault();
    const isCorrect = parseNumberInput(input) === problem.answer;
    setResult(isCorrect ? "correct" : "incorrect");
    setStats(saveResult("math", isCorrect));
  }

  function nextQuestion() {
    setProblem(generateMathProblem(1));
    setInput("");
    setResult(null);
  }

  return (
    <PageShell
      onBack={onBack}
      stats={stats}
      subtitle="Solve one calm problem at a time."
      title="Mental math"
    >
      <ExerciseCard>
        <NumberPrompt>{formatMathProblem(problem)}</NumberPrompt>
        <form className="answer-form" onSubmit={checkAnswer}>
          <TextInput
            autoComplete="off"
            inputMode="numeric"
            label="Answer"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Type your answer"
            value={input}
          />
          <Button disabled={!input.trim() || Boolean(result)} type="submit">
            Check
          </Button>
        </form>
        <Feedback correctAnswer={formatNumber(problem.answer)} result={result} />
        <Button onClick={nextQuestion} variant={result ? "primary" : "secondary"}>
          Next problem
        </Button>
      </ExerciseCard>
    </PageShell>
  );
}
