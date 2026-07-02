import Link from "next/link";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Learning-first demo</p>
        <h1>Candidate Preparation Tracker</h1>
        <p className="intro-text">
          This small app is designed to teach structure, not impress with
          complexity. Read the files slowly and follow how data moves from the
          Next.js frontend to the Python backend, then into PostgreSQL and
          Snowflake.
        </p>

        <div className="button-row">
          <Link className="primary-button" href="/tasks">
            Open task tracker
          </Link>
          <Link className="secondary-button" href="/analytics">
            Open analytics page
          </Link>
        </div>
      </section>

      <section className="info-grid">
        <article className="info-card">
          <h2>What to look for</h2>
          <ul>
            <li>How Next.js pages are split by route.</li>
            <li>How browser `fetch` calls reach the Python API.</li>
            <li>Why PostgreSQL stores the main task records.</li>
            <li>Why Snowflake is used only for a tiny reporting example.</li>
          </ul>
        </article>

        <article className="info-card">
          <h2>Simple engineering habits</h2>
          <ul>
            <li>One clear responsibility per folder.</li>
            <li>Environment variables for values that change by environment.</li>
            <li>Small files with comments only where they truly help.</li>
            <li>Graceful fallback when Snowflake is not configured yet.</li>
          </ul>
        </article>
      </section>
    </main>
  );
}

