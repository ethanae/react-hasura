export interface IDotaApiTeam {
  last_match_time: number;
  logo_url: string;
  losses: number;
  name: string;
  rating: number;
  tag: string;
  team_id: number;
  wins: number;
}

export interface IDotaApiPlayer {
  account_id: string;
  steam_id: string;
  avatar: string;
  avatar_medium: string;
  avatar_full: string;
  profile_url: string;
  persona_name: string;
  cheese: number;
  last_match_time: string;
  player_name: string;
  country_code: string;
  fantasy_role: number;
  team_id: number;
  is_locked: boolean;
}