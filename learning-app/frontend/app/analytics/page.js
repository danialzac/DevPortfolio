"use client";

import { useEffect, useState } from "react";
import { fetchAnalytics } from "../../lib/api";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [statusText, setStatusText] = useState("Loading analytics...");

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const response = await fetchAnalytics();
      setAnalytics(response);
      setStatusText("Analytics loaded.");
    } catch (error) {
      setStatusText(`Could not load analytics: ${error.message}`);
    }
  }

  return (
    <main className="page-shell">
      <section className="page-header">
        <p className="eyebrow">Frontend route: /analytics</p>
        <h1>Simple analytics summary</h1>
        <p>
          PostgreSQL gives us operational task data. Snowflake is used only for
          a tiny reporting example so you can compare their roles.
        </p>
      </section>

      <p className="status-banner">{statusText}</p>

      {analytics ? (
        <div className="info-grid">
          <article className="info-card">
            <h2>PostgreSQL summary</h2>
            <p>Total tasks: {analytics.postgres_summary.total_tasks}</p>
            <p>Completed tasks: {analytics.postgres_summary.completed_tasks}</p>
            <p>Open tasks: {analytics.postgres_summary.open_tasks}</p>
          </article>

          <article className="info-card">
            <h2>Snowflake example</h2>
            <p>Source: {analytics.snowflake_report.source}</p>
            <p>{analytics.snowflake_report.note}</p>

            <div className="simple-table">
              <div className="table-row table-header">
                <span>Category</span>
                <span>Events</span>
              </div>

              {analytics.snowflake_report.rows.map((row) => (
                <div className="table-row" key={row.category}>
                  <span>{row.category}</span>
                  <span>{row.tasks_logged}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      ) : null}
    </main>
  );
}

