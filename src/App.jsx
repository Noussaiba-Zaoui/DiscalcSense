import { useState } from "react";
import Home from "./pages/Home";
import ReadNumbers from "./pages/ReadNumbers";
import WriteNumbers from "./pages/WriteNumbers";
import MentalMath from "./pages/MentalMath";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "read") return <ReadNumbers onBack={() => setPage("home")} />;
  if (page === "write") return <WriteNumbers onBack={() => setPage("home")} />;
  if (page === "math") return <MentalMath onBack={() => setPage("home")} />;

  return <Home onNavigate={setPage} />;
}