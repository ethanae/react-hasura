import gql from 'graphql-tag';

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