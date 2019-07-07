import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

const _setPlayers = gql`
  mutation insert_dota2_player($objects: [dota2_player_insert_input!]!) {
    insert_dota2_player(objects: $objects) {
      returning {
        player_name
      }
    }
  }
`;
export const setPlayers = {
  ast: _setPlayers,
  stringified: print(_setPlayers)
}

const _setTeams = gql`
  mutation insert_dota2_team($objects: [dota2_team_insert_input!]!) {
    insert_dota2_team(objects: $objects) {
      returning {
        team_name
      }
    }
  }
`;
export const setTeams = {
  ast: _setTeams,
  stringified: print(_setTeams)
}