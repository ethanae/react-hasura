import { client } from './apollo';
import gql from 'graphql-tag';
import { countTeams, countPlayers } from './query';
import { IDota2TeamAggregate, Notice, IDota2PlayerAggregate } from '../types';

const apiBaseUrl = 'https://api.opendota.com/api';

export const insertTeamsMutation = gql`
    mutation insert_dota2_team($objects: [dota2_team_insert_input!]!) {
      insert_dota2_team(objects: $objects) {
        returning {
          team_name
        }
      }
    }
`;

export const insertPlayersMutation = gql`
    mutation insert_dota2_player($objects: [dota2_player_insert_input!]!) {
      insert_dota2_player(objects: $objects) {
        returning {
          player_name
        }
      }
    }
`;

export async function insertTeams(): Promise<Notice> {
  const { data: { dota2_team_aggregate: { aggregate: { count } } } } = await client.query<IDota2TeamAggregate>({ query: countTeams });
  if (count > 0) {
    return {
      message: 'Team data already exists ¯\\_(ツ)_/¯',
      type: 'info'
    };
  }

  const teams = await (await fetch(apiBaseUrl + '/teams')).json();
  const mappedTeams = teams.map((t: any) => {
    const team = { ...t, team_name: t.name };
    delete team.name;
    return team;
  });


  await client.mutate({
    mutation: insertTeamsMutation,
    variables: { objects: mappedTeams }
  });

  return {
    message: 'Adding teams...',
    type: 'success'
  };
}

export async function insertPlayers(): Promise<Notice> {
  const { data: { dota2_player_aggregate: { aggregate: { count } } } } = await client.query<IDota2PlayerAggregate>({ query: countPlayers });
  if (count > 0) {
    return {
      message: 'Player data already exists',
      type: 'info'
    }
  }

  const players = await (await fetch(apiBaseUrl + '/proPlayers')).json();
  const preparedPlayers = players.map((p: any) => {
    return {
      account_id: p.account_id,
      steam_id: p.steamid,
      avatar: p.avatar,
      avatar_medium: p.avatarmedium,
      avatar_full: p.avatarfull,
      profile_url: p.profileurl,
      persona_name: p.personaname,
      cheese: p.cheese,
      last_match_time: p.last_match_time,
      player_name: p.name,
      country_code: p.country_code,
      fantasy_role: p.fantasy_role,
      team_id: p.team_id,
      is_locked: p.is_locked,
      is_pro: p.is_pro
    };
  });

  const result = await client.mutate({ 
    mutation: insertPlayersMutation,
    variables: {
      objects: preparedPlayers
    }
  });
  console.log({ result });
  return {
    message: `Adding players ${players.length}...`,
    type: 'success'
  }
} 