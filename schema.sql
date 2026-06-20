CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    alias TEXT NOT NULL DEFAULT '' CHECK (length(alias) <= 20),
    message TEXT NOT NULL CHECK (length(message) >= 1 AND length(message) <= 280),
    created_at TEXT NOT NULL
);