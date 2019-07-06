import gql from 'graphql-tag';
export const setPlayers = gql`
  mutation insert_dota2_player($objects: [dota2_player_insert_input!]!) {
    insert_dota2_player(objects: $objects) {
      returning {
        player_name
      }
    }
  }
`;

export const setTeams = gql`
  mutation insert_dota2_team($objects: [dota2_team_insert_input!]!) {
    insert_dota2_team(objects: $objects) {
      returning {
        team_name
      }
    }
  }
`;