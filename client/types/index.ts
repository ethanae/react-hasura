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

export interface ITeamIDQueryResponse {
  dota2_team: Array<{ team_id: ITeam['team_id'] }>;
}

export interface IDota2TeamQueryResponse {
  dota2_team: Array<ITeam>;
}

export interface IDota2TeamAggregateResponse {
  dota2_team_aggregate: {
    aggregate: {
      count: number;
    }
  };
}

export interface IDota2PlayerAggregateResponse {
  dota2_player_aggregate: {
    aggregate: {
      count: number;
    }
  };
}

export interface IPlayer {
  account_id: number;
  avatar_full: string;
  player_name: string;
  country_code: string;
  last_match_time: string;
}

export interface IPlayerTeamQueryNestedResponse {
  team: {
    team_name: string;
  }
}

export interface IPlayerNestedTeam extends IPlayer, IPlayerTeamQueryNestedResponse { }

export interface IDota2PlayerQueryResponse {
  dota2_player: IPlayer[];
}

export interface IDota2PlayerTeamNestedQueryResponse {
  dota2_player: IPlayerNestedTeam[];
}

export type Notice = {
  message: string;
  type: 'info' | 'success' | 'error';
};