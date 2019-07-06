/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * unique or primary key constraints on table "dota2.hero"
 */
export enum dota2_hero_constraint {
  hero_hero_id_key = "hero_hero_id_key",
  hero_pkey = "hero_pkey",
}

/**
 * update columns of table "dota2.hero"
 */
export enum dota2_hero_update_column {
  attack_type = "attack_type",
  hero_id = "hero_id",
  hero_name = "hero_name",
  id = "id",
  legs = "legs",
  localized_name = "localized_name",
  primary_attr = "primary_attr",
  roles = "roles",
}

/**
 * unique or primary key constraints on table "dota2.player"
 */
export enum dota2_player_constraint {
  player_account_id_key = "player_account_id_key",
  player_pkey = "player_pkey",
  player_steam_id_key = "player_steam_id_key",
}

/**
 * unique or primary key constraints on table "dota2.player_recent_match"
 */
export enum dota2_player_recent_match_constraint {
  player_recent_match_pkey = "player_recent_match_pkey",
}

/**
 * update columns of table "dota2.player_recent_match"
 */
export enum dota2_player_recent_match_update_column {
  account_id = "account_id",
  assists = "assists",
  deaths = "deaths",
  duration = "duration",
  gold_per_min = "gold_per_min",
  hero_damage = "hero_damage",
  hero_healing = "hero_healing",
  hero_id = "hero_id",
  id = "id",
  kills = "kills",
  last_hits = "last_hits",
  match_id = "match_id",
  player_slot = "player_slot",
  radiant_win = "radiant_win",
  start_time = "start_time",
  tower_damage = "tower_damage",
  xp_per_min = "xp_per_min",
}

/**
 * update columns of table "dota2.player"
 */
export enum dota2_player_update_column {
  account_id = "account_id",
  avatar = "avatar",
  avatar_full = "avatar_full",
  avatar_medium = "avatar_medium",
  cheese = "cheese",
  country_code = "country_code",
  fantasy_role = "fantasy_role",
  id = "id",
  is_locked = "is_locked",
  is_pro = "is_pro",
  last_match_time = "last_match_time",
  persona_name = "persona_name",
  player_name = "player_name",
  profile_url = "profile_url",
  steam_id = "steam_id",
  team_id = "team_id",
}

/**
 * unique or primary key constraints on table "dota2.team"
 */
export enum dota2_team_constraint {
  team_pkey = "team_pkey",
  team_team_id_key = "team_team_id_key",
}

/**
 * unique or primary key constraints on table "dota2.team_hero"
 */
export enum dota2_team_hero_constraint {
  no_duplicate_team_id_hero_id = "no_duplicate_team_id_hero_id",
  team_hero_pkey = "team_hero_pkey",
}

/**
 * update columns of table "dota2.team_hero"
 */
export enum dota2_team_hero_update_column {
  games_played = "games_played",
  hero_id = "hero_id",
  id = "id",
  team_id = "team_id",
  wins = "wins",
}

/**
 * update columns of table "dota2.team"
 */
export enum dota2_team_update_column {
  id = "id",
  last_match_time = "last_match_time",
  logo_url = "logo_url",
  losses = "losses",
  rating = "rating",
  tag = "tag",
  team_id = "team_id",
  team_name = "team_name",
  wins = "wins",
}

/**
 * input type for inserting data into table "dota2.hero"
 */
export interface dota2_hero_insert_input {
  attack_type?: string | null;
  hero_id?: number | null;
  hero_name?: string | null;
  id?: number | null;
  legs?: number | null;
  localized_name?: string | null;
  player_recent_matches?: dota2_player_recent_match_arr_rel_insert_input | null;
  primary_attr?: string | null;
  roles?: any | null;
  team_heros?: dota2_team_hero_arr_rel_insert_input | null;
}

/**
 * input type for inserting object relation for remote table "dota2.hero"
 */
export interface dota2_hero_obj_rel_insert_input {
  data: dota2_hero_insert_input;
  on_conflict?: dota2_hero_on_conflict | null;
}

/**
 * on conflict condition type for table "dota2.hero"
 */
export interface dota2_hero_on_conflict {
  constraint: dota2_hero_constraint;
  update_columns: dota2_hero_update_column[];
}

/**
 * input type for inserting array relation for remote table "dota2.player"
 */
export interface dota2_player_arr_rel_insert_input {
  data: dota2_player_insert_input[];
  on_conflict?: dota2_player_on_conflict | null;
}

/**
 * input type for inserting data into table "dota2.player"
 */
export interface dota2_player_insert_input {
  account_id?: any | null;
  avatar?: string | null;
  avatar_full?: string | null;
  avatar_medium?: string | null;
  cheese?: number | null;
  country_code?: string | null;
  fantasy_role?: number | null;
  id?: number | null;
  is_locked?: boolean | null;
  is_pro?: boolean | null;
  last_match_time?: string | null;
  persona_name?: string | null;
  player_name?: string | null;
  player_recent_matches?: dota2_player_recent_match_arr_rel_insert_input | null;
  profile_url?: string | null;
  steam_id?: string | null;
  team?: dota2_team_obj_rel_insert_input | null;
  team_id?: number | null;
}

/**
 * input type for inserting object relation for remote table "dota2.player"
 */
export interface dota2_player_obj_rel_insert_input {
  data: dota2_player_insert_input;
  on_conflict?: dota2_player_on_conflict | null;
}

/**
 * on conflict condition type for table "dota2.player"
 */
export interface dota2_player_on_conflict {
  constraint: dota2_player_constraint;
  update_columns: dota2_player_update_column[];
}

/**
 * input type for inserting array relation for remote table "dota2.player_recent_match"
 */
export interface dota2_player_recent_match_arr_rel_insert_input {
  data: dota2_player_recent_match_insert_input[];
  on_conflict?: dota2_player_recent_match_on_conflict | null;
}

/**
 * input type for inserting data into table "dota2.player_recent_match"
 */
export interface dota2_player_recent_match_insert_input {
  account_id?: number | null;
  assists?: any | null;
  deaths?: any | null;
  duration?: number | null;
  gold_per_min?: number | null;
  hero?: dota2_hero_obj_rel_insert_input | null;
  hero_damage?: number | null;
  hero_healing?: number | null;
  hero_id?: number | null;
  id?: number | null;
  kills?: any | null;
  last_hits?: any | null;
  match_id?: any | null;
  player?: dota2_player_obj_rel_insert_input | null;
  player_slot?: any | null;
  radiant_win?: boolean | null;
  start_time?: number | null;
  tower_damage?: number | null;
  xp_per_min?: number | null;
}

/**
 * on conflict condition type for table "dota2.player_recent_match"
 */
export interface dota2_player_recent_match_on_conflict {
  constraint: dota2_player_recent_match_constraint;
  update_columns: dota2_player_recent_match_update_column[];
}

/**
 * input type for inserting array relation for remote table "dota2.team_hero"
 */
export interface dota2_team_hero_arr_rel_insert_input {
  data: dota2_team_hero_insert_input[];
  on_conflict?: dota2_team_hero_on_conflict | null;
}

/**
 * input type for inserting data into table "dota2.team_hero"
 */
export interface dota2_team_hero_insert_input {
  games_played?: number | null;
  hero?: dota2_hero_obj_rel_insert_input | null;
  hero_id?: number | null;
  id?: number | null;
  team?: dota2_team_obj_rel_insert_input | null;
  team_id?: number | null;
  wins?: number | null;
}

/**
 * on conflict condition type for table "dota2.team_hero"
 */
export interface dota2_team_hero_on_conflict {
  constraint: dota2_team_hero_constraint;
  update_columns: dota2_team_hero_update_column[];
}

/**
 * input type for inserting data into table "dota2.team"
 */
export interface dota2_team_insert_input {
  id?: number | null;
  last_match_time?: number | null;
  logo_url?: string | null;
  losses?: number | null;
  players?: dota2_player_arr_rel_insert_input | null;
  rating?: any | null;
  tag?: string | null;
  team_heros?: dota2_team_hero_arr_rel_insert_input | null;
  team_id?: number | null;
  team_name?: string | null;
  wins?: number | null;
}

/**
 * input type for inserting object relation for remote table "dota2.team"
 */
export interface dota2_team_obj_rel_insert_input {
  data: dota2_team_insert_input;
  on_conflict?: dota2_team_on_conflict | null;
}

/**
 * on conflict condition type for table "dota2.team"
 */
export interface dota2_team_on_conflict {
  constraint: dota2_team_constraint;
  update_columns: dota2_team_update_column[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
