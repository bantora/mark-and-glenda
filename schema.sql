CREATE TABLE IF NOT EXISTS rsvps (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending INTEGER NOT NULL,
  guest_count INTEGER NOT NULL DEFAULT 1,
  plus_one_name TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
