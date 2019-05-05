import * as React from 'react';
import { ApolloConsumer, Subscription } from 'react-apollo';

import { ITeam } from '../types';
import TeamTable from '../components/TeamTable';
import { insertTeams } from '../data/mutation';
import { teamSubscriber } from '../data/subscription';
import { createToast } from '../utils';

export default class extends React.Component<{}, { teams: Array<ITeam>; }> {
  constructor({}) {
    super({});
    this.state = {
      teams: [] as Array<ITeam>
    } 
  }
  onInitialiseApp = async () => {
    const teamsNotice = await insertTeams();
    createToast(teamsNotice);
  }

  render() {
    return (
      <div>
        <ApolloConsumer>
        {client => (
            <div>
              <button onClick={_ => this.onInitialiseApp()}>Initialise App</button>
            </div>
          )
        }
        </ApolloConsumer>
        <Subscription subscription={teamSubscriber}>
          {
            (sub: any) => {
              if(sub.loading) return <div>Loading...</div>;
              if(sub.error) { 
                createToast({ message: 'There was an error creating the subscription.', type: 'error' });
                return null;
              }
              const teams = sub.data.dota2_team.sort((a: ITeam, b: ITeam) => b.rating - a.rating);
              return (
                <div>
                  <TeamTable data={teams} />
                </div>
              )
            }
          }
        </Subscription>
      </div>
    );
  }
}