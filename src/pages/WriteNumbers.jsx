import { useState } from "react";
import { Button } from "../components/Button";
import { ExerciseCard } from "../components/ExerciseCard";
import { Feedback } from "../components/Feedback";
import { PageShell } from "../components/Layout";
import { TextInput } from "../components/TextInput";
import { WordPrompt } from "../components/NumberPrompt";
import {
  formatNumber,
  generateNumber,
  numberToFrenchWords,
  parseNumberInput,
} from "../utils/numbers";
import { speakFrench } from "../utils/speech";
import { getStats, saveResult } from "../utils/storage";

export default function WriteNumbers({ onBack }) {
  const [number, setNumber] = useState(() => generateNumber(1));
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(() => getStats("write"));

  const words = numberToFrenchWords(number);

  function checkAnswer(event) {
    event.preventDefault();
    const isCorrect = parseNumberInput(input) === number;
    setResult(isCorrect ? "correct" : "incorrect");
    setStats(saveResult("write", isCorrect));
  }

  function nextQuestion() {
    setNumber(generateNumber(1));
    setInput("");
    setResult(null);
  }

  return (
    <PageShell
      onBack={onBack}
      stats={stats}
      subtitle="Type the digits for the French words."
      title="Write numbers"
    >
      <ExerciseCard>
        <WordPrompt>{words}</WordPrompt>
        <div className="button-row">
          <Button onClick={() => speakFrench(words)} variant="secondary">
            Hear in French
          </Button>
        </div>

        <form className="answer-form" onSubmit={checkAnswer}>
          <TextInput
            autoComplete="off"
            inputMode="numeric"
            label="Digits"
            onChange={(event) => setInput(event.target.value)}
            placeholder="Example: 482"
            value={input}
          />
          <Button disabled={!input.trim() || Boolean(result)} type="submit">
            Check
          </Button>
        </form>

        <Feedback correctAnswer={formatNumber(number)} result={result} />
        <Button onClick={nextQuestion} variant={result ? "primary" : "secondary"}>
          Next number
        </Button>
      </ExerciseCard>
    </PageShell>
  );
}
