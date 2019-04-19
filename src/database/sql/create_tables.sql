CREATE SCHEMA "dota2"
CREATE TABLE "dota2".team (
  id SERIAL PRIMARY KEY,
  team_id INTEGER NOT NULL UNIQUE,
  wins INTEGER NOT NULL,
  losses INTEGER NOT NULL,
  last_match_time INTEGER,
  team_name TEXT NOT NULL,
  tag TEXT NOT NULL,
  logo_url TEXT
);