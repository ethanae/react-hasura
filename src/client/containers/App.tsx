import * as React from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-boost';
import { ApolloConsumer } from 'react-apollo';

import { ITeam } from '../types';
import TeamTable from '../components/TeamTable';
import { insertTeams } from '../data/insertData';

const query = gql`
  {
    dota2_team {
      team_name,
      tag,
      wins,
      losses,
      logo_url,
      last_match_time
    }
  }
`;

export default class extends React.Component<{}, { teams: Array<ITeam>; }> {
  constructor({}) {
    super({});
    this.state = {
      teams: [] as Array<ITeam>
    } 
  }
  onInitialiseApp = async (client: ApolloClient<any>) => {
    const x = await insertTeams();
    const response = await client.query({ query });
    console.log(response.data.dota2_team);
    this.setState({ teams: response.data.dota2_team });
  }

  render() {
    return (
      <div>
        <ApolloConsumer>
        {client => (
            <div>
              <button onClick={_ => this.onInitialiseApp(client)}>Initialise App</button>
            </div>
          )
        }
        </ApolloConsumer>
        <TeamTable data={this.state.teams}/>
      </div>
    );
  }
}