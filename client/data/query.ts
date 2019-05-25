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
      dota2_team(offset: ${offset}, limit: ${limit}) {
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