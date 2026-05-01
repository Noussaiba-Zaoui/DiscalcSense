import { useState } from "react";
import { AppShell } from "../components/Layout";
import { getStats } from "../utils/storage";

const EXERCISES = [
  {
    id: "read",
    title: "Read numbers",
    description: "See digits and choose the French wording.",
  },
  {
    id: "write",
    title: "Write numbers",
    description: "Read or hear words, then type the digits.",
  },
  {
    id: "math",
    title: "Mental math",
    description: "Practice calm addition and subtraction.",
  },
];

export default function Home({ onNavigate }) {
  const [stats] = useState(() => ({
      read: getStats("read"),
      write: getStats("write"),
      math: getStats("math"),
    }));

  return (
    <AppShell>
      <section className="home">
        <div className="home-copy">
          <p className="eyebrow">Adult number practice</p>
          <h1>NumSense</h1>
          <p>
            Simple, calm exercises for reading numbers, writing numbers, and
            doing mental math without time pressure.
          </p>
        </div>

        <div className="exercise-grid" aria-label="Practice modes">
          {EXERCISES.map((exercise) => (
            <button
              className="exercise-link"
              key={exercise.id}
              onClick={() => onNavigate(exercise.id)}
              type="button"
            >
              <span>
                <strong>{exercise.title}</strong>
                <small>{exercise.description}</small>
              </span>
              <span className="mini-stat">
                {stats[exercise.id]?.total ? `${stats[exercise.id].total} done` : "Start"}
              </span>
            </button>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
