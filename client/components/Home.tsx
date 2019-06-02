import * as React from 'react';

import { ITeam } from '../types';
import { insertTeams, insertPlayers, insertHeroes, insertTeamHeroes } from '../data/mutation';
import { createToast } from '../utils';

export default class extends React.Component<{}, { teams: Array<ITeam>; progressMessage: string; }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      teams: [] as Array<ITeam>,
      progressMessage: ''
    } 
  }

  componentDidMount() {
    //@ts-ignore
    this.progress.addEventListener('notify', (e) => {
      console.log('got event', e.detail);
      this.setState({ progressMessage: e.detail });
    })
  }
  
  onInitialiseApp = () => {
    // TODO: optimise to prevent ui blocking
    insertTeams()
    .then(insertPlayers)
    .then(insertHeroes)
    .then(insertTeamHeroes);
  }

  render() {
    return (
      <div className="container-fluid">
        <div>
          <button className="btn btn-lg btn-success" onClick={this.onInitialiseApp}>
            Initialise
          </button>
          //@ts-ignore
          <h3 ref={elem => this.progress = elem}>{this.state.progressMessage}</h3>
        </div>
      </div>
    );
  }
}