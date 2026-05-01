export function AppShell({ children }) {
  return <main className="app-shell">{children}</main>;
}

export function PageShell({ onBack, title, subtitle, stats, children }) {
  const accuracy =
    stats?.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null;

  return (
    <AppShell>
      <header className="page-header" aria-label="Page">
        <button className="quiet-button" onClick={onBack} type="button">
          Back
        </button>
        <div className="page-title-group">
          <h1>{title}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        <div className="stat-pill" aria-label="Accuracy">
          {accuracy === null ? "New" : `${accuracy}%`}
        </div>
      </header>

      <section className="page-content">{children}</section>
    </AppShell>
  );
}
