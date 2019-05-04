export interface ITeam {
  id: number;
  team_id: number;
  wins: number;
  rating: number;
  losses: number;
  last_match_time: number;
  team_name: string;
  tag: string;
  logo_url: string;
}