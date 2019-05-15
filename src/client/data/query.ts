import gql from 'graphql-tag';
import { client } from './apollo';
import { IPlayer } from '../types';

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

export async function getPlayersByTeamId(teamId: number) {
  const players = await client.query<{ dota2_player: Array<IPlayer> }>({
    query: queryPlayersByTeamId,
    variables: {
      teamId
    }
  }).catch(err => {
    console.log(err);
    throw err;
  });

  return players.data.dota2_player;
}