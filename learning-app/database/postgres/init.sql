-- This table stores the main app data.
-- PostgreSQL is the operational database for the tracker.

CREATE TABLE IF NOT EXISTS prep_tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(120) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO prep_tasks (title, category, completed)
VALUES
    ('Review core PostgreSQL queries', 'Technical', TRUE),
    ('Write 3 STAR interview stories', 'Behavioral', FALSE),
    ('Sketch a simple system design answer', 'System Design', FALSE)
ON CONFLICT DO NOTHING;
