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
  team_name: string;
}


export interface IDota2PlayerQueryResponse {
  dota2_player: IPlayer[];
}

export type Notice = {
  message: string;
  type: 'info' | 'success' | 'error';
};