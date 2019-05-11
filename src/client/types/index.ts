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

export interface IDota2TeamAggregate {
  dota2_team_aggregate: {
    aggregate: {
      count: number;
    }
  };
}

export interface IDota2PlayerAggregate {
  dota2_player_aggregate: {
    aggregate: {
      count: number;
    }
  };
}

export type Notice = {
  message: string;
  type: 'info' | 'success' | 'error';
};