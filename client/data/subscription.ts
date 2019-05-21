import gql from 'graphql-tag';

export const teamSubscriber = gql`
  subscription {
    dota2_team(order_by: { rating: desc }) {
      team_id,
      team_name,
      tag,
      rating,
      wins,
      losses,
      last_match_time,
      logo_url
    }
  }
`;