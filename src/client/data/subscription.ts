import gql from 'graphql-tag';

export const teamSubscriber = gql`
  subscription {
    dota2_team(order_by: { id: desc }) {
      team_name
    }
  }
`;