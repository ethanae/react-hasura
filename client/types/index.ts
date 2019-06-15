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

export interface IDota2HeroAggregateResponse {
  dota2_hero_aggregate: {
    aggregate: {
      count: number;
    }
  };
}

export interface IDota2TeamHeroAggregateResponse {
  dota2_team_hero_aggregate: {
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

export interface IRecentMatch {
  xp_per_min: number;
  tower_damage: number;
  start_time: number;
  radiant_win: boolean;
  player_slot: number;
  match_id: number;
  last_hits: number;
  kills: number;
  gold_per_min: number;
  duration: number;
  deaths: number;
  assists: number;
  hero: { localized_name: string; };
}

export interface IRecentPlayerMatchResponse {
  dota2_player: [{
    player_recent_matches: IRecentMatch[];
  }]
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

export interface IDota2TeamDetailsQuery extends Pick<ITeam, 'team_name' | 'wins' | 'losses' | 'rating'> {
  team_heros: Array<{
    games_played: number;
    wins: number;
    hero: {
      attack_type: string;
      localized_name: string;
      primary_attr: string;
      roles: string[];
    }
  }>;
}

export interface IDota2TeamDetailsQueryResponse {
  dota2_team: [IDota2TeamDetailsQuery];
}

export interface IDota2InsertTeamHeroResponse {
  insert_dota2_team_hero: {
    returning: { id: number; }[];
  }
}

export type Notice = {
  message: string;
  type: 'info' | 'success' | 'error';
};