import { client } from './apollo';
import gql from 'graphql-tag';
import { countTeams } from './query';
import { IDota2TeamAggregate, Notice } from '../types';

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

export async function insertTeams(): Promise<Notice> {
  const { data: { dota2_team_aggregate: { aggregate: { count } } } } = await client.query<IDota2TeamAggregate>({ query: countTeams });
  if(count > 0) {
    return {
      message: 'Teams already exist. ¯\\_(ツ)_/¯',
      type: 'info'
    };
  }

  const teams = await (await fetch(apiBaseUrl + '/teams')).json();
  const mappedTeams = teams.map((t: any) => {
    const team = {...t, team_name: t.name };
    delete team.name;
    return team;
  });

  
  await client.mutate({
    mutation: insertTeamsMutation, 
    variables: { objects: mappedTeams }
  });

  return {
    message: 'Creating teams...',
    type: 'info'
  };
}