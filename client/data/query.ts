import gql from 'graphql-tag';

export const queryTeamIDs = gql`
  {
    dota2_team {
      team_id
    }
  }
`;

export const queryTeams = gql`
  {
    dota2_team {
      team_id,
      team_name,
      tag,
      rating,
      wins,
      losses,
      logo_url,
      last_match_time
    }
  }
`;

export const countTeams = gql`
  {
    dota2_team_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const countPlayers = gql`
  {
    dota2_player_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const countHeroes = gql`
  {
    dota2_hero_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const countTeamHeroes = gql`
  {
    dota2_team_hero_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const queryPlayersByTeamId = gql`
  query dota2_player($teamId: Int!) {
    dota2_player (where: { team_id: { _eq: $teamId } }) {
      avatar_full
      account_id
      country_code
      last_match_time
      player_name
    }
  }
`;

export const queryPlayerAccountIds = gql`
  {
    dota2_player {
      account_id
    }
  }
`;

export const queryPlayerDetail = gql`
  query dota2_player($accountId: bigint!, $matchesLimit: Int!) {
    dota2_player(where: { account_id: { _eq: $accountId } }) {
      player_name
      team {
        team_name
      }
      player_recent_matches(limit: $matchesLimit) {
        xp_per_min
        tower_damage
        start_time
        radiant_win
        player_slot
        match_id
        last_hits
        kills
        hero {
          localized_name
        }
        gold_per_min
        duration
        deaths
        assists
      }
    }
  }
`;

export const queryPlayersPaged = (offset: number, limit: number) => {
  return gql`
    query {
      dota2_player(offset: ${offset}, limit: ${limit}) {
        account_id
        avatar_full
        last_match_time
        player_name
        team_id
        country_code
        team {
          team_name  
        }
      }
      dota2_player_aggregate {
        aggregate {
          count
        }
      }
    }
  `;
}

export const queryTeamsPaged = (offset: number, limit: number) => {
  return gql`
    query {
      dota2_team(offset: ${offset}, limit: ${limit}, order_by: { rating: desc }) {
        team_id,
        team_name,
        tag,
        rating,
        wins,
        losses,
        logo_url,
        last_match_time
      }
      dota2_team_aggregate {
        aggregate {
          count
        }
      }
    }
  `;
}

export const queryTeamHeroes = gql`
  query dota2_team($teamId: Int!) {
    dota2_team(where: { team_id: { _eq: $teamId } }) {
      team_name
      wins
      losses
      rating
      team_heros {
        games_played
        wins
        hero {
          attack_type
          localized_name
          primary_attr
          roles
        }
      }
    }
  }
`;