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
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  personaname: string;
  cheese: number;
  last_match_time: string;
  name: string;
  country_code: string;
  fantasy_role: number;
  team_id: number;
  is_locked: boolean;
  is_pro: boolean;
}


export interface IDotaHero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  legs: number;
}

export interface IDotaTeamHero
  extends Pick<IDotaHero, 'localized_name'> {
  hero_id: number;
  games_played: number;
  wins: number;
}

export interface IRecentMatch {
  match_id: number; 
  player_slot: number; 
  radiant_win: boolean; 
  duration: number; 
  game_mode: number; 
  lobby_type: number; 
  hero_id: number; 
  start_time: number; 
  version: number; 
  kills: number; 
  deaths: number; 
  assists: number; 
  skill?: any; 
  xp_per_min: number; 
  gold_per_min: number; 
  hero_damage: number; 
  tower_damage: number; 
  hero_healing: number; 
  last_hits: number; 
  lane: number; 
  lane_role: number; 
  is_roaming: boolean; 
  cluster: number; 
  leaver_status: number; 
  party_size: number
}