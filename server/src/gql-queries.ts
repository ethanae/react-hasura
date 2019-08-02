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
};

const _getPlayerAccIDs = gql`
  query playerAccIDs {
    dota2_player {
      account_id
    }
  }
`;
export const getPlayerAccIDs = {
  ast: _getPlayerAccIDs,
  stringified: print(_getPlayerAccIDs)
};

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
};

const _getTeamIDs = gql`
  query getTeams {
    dota2_team {
      team_id
    }
  }
`;
export const getTeamIDs = {
  ast: _getTeamIDs,
  stringified: print(_getTeamIDs)
};

const _setHeroes = gql`
  mutation insert_dota2_hero($objects: [dota2_hero_insert_input!]!) {
    insert_dota2_hero(objects: $objects) {
      returning {
        hero_name
      }
    }
  }
`;
export const setHeroes = {
  ast: _setHeroes,
  stringified: print(_setHeroes)
};

const _setTeamHeroes = gql`
  mutation insert_dota2_team_hero($objects: [dota2_team_hero_insert_input!]!) {
    insert_dota2_team_hero(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const setTeamHeroes = {
  ast: _setTeamHeroes,
  stringified: print(_setTeamHeroes)
};

export const _setPlayerRecentMatches = gql`
  mutation insert_dota2_player_recent_match($objects: [dota2_player_recent_match_insert_input!]!) {
    insert_dota2_player_recent_match(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const setPlayerRecentMatches = {
  ast: _setPlayerRecentMatches,
  stringified: print(_setPlayerRecentMatches)
};
