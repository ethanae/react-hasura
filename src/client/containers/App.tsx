import * as React from 'react';

import { ITeam } from '../types';
import { insertTeams } from '../data/mutation';
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
      <div className="container-fluid">
        Thuis
      </div>
    );
  }
}