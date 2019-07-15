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
  wins: number;
  losses: number;
}