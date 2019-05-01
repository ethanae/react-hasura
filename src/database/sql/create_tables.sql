CREATE SCHEMA "dota2"
CREATE TABLE "dota2".team (
  id SERIAL PRIMARY KEY,
  team_id INTEGER NOT NULL UNIQUE,
  rating DECIMAL,
  wins INTEGER NOT NULL,
  losses INTEGER NOT NULL,
  last_match_time INTEGER,
  team_name TEXT NOT NULL,
  tag TEXT NOT NULL,
  logo_url TEXT
);

CREATE TABLE "dota2".player (
  id SERIAL PRIMARY KEY,
  account_id BIGINT NOT NULL,
  steam_id TEXT NOT NULL,
  avatar TEXT,
  avatar_medium TEXT,
  avatar_full TEXT,
  profile_url TEXT,
  persona_name TEXT,
  cheese INTEGER,
  last_match_time INTEGER,
  player_name TEXT NOT NULL,
  country_code TEXT,
  fantasy_role INTEGER,
  team_id INTEGER,
  is_locked BOOLEAN,
  is_pro BOOLEAN
);