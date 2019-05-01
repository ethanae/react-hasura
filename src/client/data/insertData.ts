import { client } from './apollo';
import gql from 'graphql-tag';

const apiBaseUrl = 'https://api.opendota.com/api';

export async function insertTeams() {
  const teams = await (await fetch(apiBaseUrl + '/teams')).json();
  const query = gql`
    mutation insert_dota2_team($objects: [dota2_team_insert_input!]!) {
      insert_dota2_team(
        objects: $objects
      )
    }
  `;
  client.mutate({ mutation: query, variables: teams });
}