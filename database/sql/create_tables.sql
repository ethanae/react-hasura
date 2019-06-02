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
  account_id BIGINT NOT NULL UNIQUE,
  steam_id TEXT NOT NULL UNIQUE,
  avatar TEXT,
  avatar_medium TEXT,
  avatar_full TEXT,
  profile_url TEXT,
  persona_name TEXT,
  cheese INTEGER,
  last_match_time TEXT,
  player_name TEXT NOT NULL,
  country_code TEXT,
  fantasy_role INTEGER,
  team_id INTEGER REFERENCES "dota2".team(team_id) NOT NULL,
  is_locked BOOLEAN,
  is_pro BOOLEAN
);

CREATE TABLE "dota2".hero (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER NOT NULL UNIQUE,
  hero_name TEXT NOT NULL,
  localized_name TEXT NOT NULL,
  primary_attr TEXT NOT NULL,
  attack_type TEXT NOT NULL,
  roles TEXT[] NOT NULL,
  legs INTEGER
);

CREATE TABLE "dota2".team_hero (
  id SERIAL PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES "dota2".team(team_id),
  hero_id INTEGER NOT NULL REFERENCES "dota2".hero(hero_id),
  games_played INTEGER,
  wins INTEGER,
  CONSTRAINT no_duplicate_team_id_hero_id UNIQUE(team_id, hero_id)
);