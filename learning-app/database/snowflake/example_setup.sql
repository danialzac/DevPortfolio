-- This file shows one very small Snowflake setup for reporting.
-- In a real system, analytics data often arrives through ETL or ELT jobs.
-- Here we keep it tiny so the purpose stays easy to understand.

CREATE OR REPLACE TABLE interview_task_category_summary (
    category STRING,
    tasks_logged NUMBER
);

INSERT INTO interview_task_category_summary (category, tasks_logged)
VALUES
    ('Technical', 4),
    ('Behavioral', 2),
    ('System Design', 1);

SELECT category, tasks_logged
FROM interview_task_category_summary
ORDER BY tasks_logged DESC;

