import { useMemo, useState } from "react";
import { Button } from "../components/Button";
import { ChoiceList } from "../components/ChoiceList";
import { ExerciseCard } from "../components/ExerciseCard";
import { Feedback } from "../components/Feedback";
import { PageShell } from "../components/Layout";
import { NumberPrompt } from "../components/NumberPrompt";
import {
  createReadingChoices,
  formatNumber,
  generateNumber,
  numberToFrenchWords,
} from "../utils/numbers";
import { getStats, saveResult } from "../utils/storage";

export default function ReadNumbers({ onBack }) {
  const [number, setNumber] = useState(() => generateNumber(1));
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState(() => getStats("read"));

  const answer = numberToFrenchWords(number);
  const choices = useMemo(() => createReadingChoices(number), [number]);

  function chooseAnswer(choice) {
    const isCorrect = choice === answer;
    setSelected(choice);
    setResult(isCorrect ? "correct" : "incorrect");
    setStats(saveResult("read", isCorrect));
  }

  function nextQuestion() {
    setNumber(generateNumber(1));
    setSelected("");
    setResult(null);
  }

  return (
    <PageShell
      onBack={onBack}
      stats={stats}
      subtitle="Choose the words that match the digits."
      title="Read numbers"
    >
      <ExerciseCard>
        <NumberPrompt>{formatNumber(number)}</NumberPrompt>
        <ChoiceList
          disabled={Boolean(result)}
          onSelect={chooseAnswer}
          options={choices}
          selected={selected}
        />
        <Feedback correctAnswer={answer} result={result} />
        <Button onClick={nextQuestion} variant={result ? "primary" : "secondary"}>
          Next number
        </Button>
      </ExerciseCard>
    </PageShell>
  );
}
