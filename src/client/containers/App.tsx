import * as React from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-boost';
import { ApolloConsumer } from 'react-apollo';

import { ITeam } from '../types';

export interface IState {
  teams: Array<ITeam>;
}

const query = gql`
  {
    dota2_team {
      team_name,
      tag,
      wins,
      losses,
      logo_url
    }
  }
`;

export default class extends React.Component<{}, IState> {
  constructor(props: any) { 
    super(props);
    this.state = {
      teams: [] as Array<ITeam>
    } 
  }
  onInitialiseApp = async (client: ApolloClient<any>) => {
    const teams = await client.query({ query });
    this.setState({ teams: teams.data });
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
            <div>
              <button onClick={_ => this.onInitialiseApp(client)}>Initialise App</button>
            </div>
          )
        }
      </ApolloConsumer>
    );
  }
}