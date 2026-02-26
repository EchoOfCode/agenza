import aiosqlite
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "agenza.db")

SCHEMA = """
CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    type TEXT DEFAULT 'python',
    file_path TEXT,
    brutal_score REAL DEFAULT 0,
    success_rate REAL DEFAULT 0,
    total_runs INTEGER DEFAULT 0,
    cost_per_run REAL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS executions (
    id TEXT PRIMARY KEY,
    agent_id TEXT REFERENCES agents(id),
    goal TEXT,
    status TEXT DEFAULT 'pending',
    output TEXT,
    logs TEXT,
    duration_ms INTEGER,
    token_cost REAL DEFAULT 0,
    tool_calls INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS battles (
    id TEXT PRIMARY KEY,
    task TEXT,
    alpha_id TEXT REFERENCES agents(id),
    beta_id TEXT REFERENCES agents(id),
    winner_id TEXT,
    alpha_result TEXT,
    beta_result TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT,
    github_handle TEXT,
    total_executions INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
                   brutal_score, success_rate, total_runs, cost_per_run)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                SEED_AGENTS,
            )
        await db.commit()
    finally:
        await db.close()
