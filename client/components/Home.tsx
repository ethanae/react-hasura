import * as React from 'react';

import { ITeam } from '../types';
import { insertTeams, insertPlayers, insertHeroes, insertTeamHeroes } from '../data/mutation';
import { createToast } from '../utils';

export default class extends React.Component<{}, { teams: Array<ITeam>; }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      teams: [] as Array<ITeam>
    } 
  }
  onInitialiseApp = () => {
    // TODO: optimise to prevent ui blocking
    insertTeams().then(teamsNotice => createToast(teamsNotice));
    
    insertPlayers();

    insertHeroes().then(heroesNotice => createToast(heroesNotice));

    insertTeamHeroes();
  }

  render() {
    return (
      <div className="container-fluid">
        <div>
          <button className="btn btn-lg btn-success" onClick={this.onInitialiseApp}>
            Initialise
          </button>
        </div>
      </div>
    );
  }
}