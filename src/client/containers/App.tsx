import * as React from 'react';
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-boost';
import { ApolloConsumer, Subscription } from 'react-apollo';

import { ITeam } from '../types';
import TeamTable from '../components/TeamTable';
import { upsertTeams } from '../data/mutation';
import { teamSubscriber } from '../data/subscription';

const query = gql`
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

export default class extends React.Component<{}, { teams: Array<ITeam>; teamInserted: string; }> {
  constructor({}) {
    super({});
    this.state = {
      teams: [] as Array<ITeam>,
      teamInserted: ''
    } 
  }
  onInitialiseApp = async (client: ApolloClient<any>) => {
    const x = await upsertTeams();
    const response = await client.query({ query });
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
        <Subscription subscription={teamSubscriber}>
          {
            (sub: any) => {
              if(sub.loading) return <div>Loading...</div>;
              if(sub.error) console.log(sub.error);
              console.log(sub.data)
              if(sub.data) {
                this.setState({ teams: [...this.state.teams, sub.data] });
                const length = sub.data.dota2_team.length;
                return <div>New teams: {sub.data.dota2_team.slice(0, 2).map((t: any) => <span>{ t.team_name }, </span>)} and {length - 3} others</div>
              }
            }
          }
        </Subscription>
        <TeamTable data={this.state.teams} />
      </div>
    );
  }
}