import * as React from 'react';

import { ITeam } from '../types';
import { insertTeams, insertPlayers, insertHeroes } from '../data/mutation';
import { createToast } from '../utils';

export default class extends React.Component<{}, { teams: Array<ITeam>; }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      teams: [] as Array<ITeam>
    } 
  }
  onInitialiseApp = async () => {
    const teamsNotice = await insertTeams();
    createToast(teamsNotice);
    const playersNotice = await insertPlayers();
    createToast(playersNotice);
    const heroesNotice = await insertHeroes();
    createToast(heroesNotice);
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