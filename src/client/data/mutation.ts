import { client } from './apollo';
import gql from 'graphql-tag';

const apiBaseUrl = 'https://api.opendota.com/api';

export async function upsertTeams() {
  const teams = await (await fetch(apiBaseUrl + '/teams')).json();
  const mappedTeams = teams.map((t: any) => {
    const team = {...t, team_name: t.name };
    delete team.name;
    return team;
  });

  const mutation = gql`
    mutation insert_dota2_team($objects: [dota2_team_insert_input!]!) {
      insert_dota2_team(objects: $objects) {
        returning {
          team_name
        }
      }
    }
  `;
  await client.mutate({
    mutation, 
    variables: { objects: mappedTeams }
  });
}