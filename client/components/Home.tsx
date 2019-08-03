import * as React from 'react';
import { insertTeams, insertPlayers, insertHeroes, insertTeamHeroes, insertRecentPlayerMatches } from '../data/mutation';
import Progress from './Progress';
import { CircularProgressbar } from 'react-circular-progressbar';
const aegisImgLoader = require('../assets/aegis-loader.gif');

export default class extends React.Component<{}, { progressMessage: string; progress: number; max: number; }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progressMessage: 'Click the Aegis to initialise the App',
      progress: 0,
      max: 100
    }
  }

  onInitialiseApp = () => {
    insertTeams()
      .then(insertPlayers)
      .then(insertHeroes)
      .then(_ => this.setState({ progressMessage: 'Initialisation complete' }));
  }

  onAddTeamHeroes = () => {
    const ws = new WebSocket('ws://localhost:3000/team/heroes');
    ws.onmessage = this.onTeamHeroProgress;
  }

  onTeamHeroProgress = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    this.setState({
      progress: Math.round((data.progress / data.total) * 100)
    });
  }

  render() {
    return (
      <div className="container-fluid text-light">
        <div className="d-flex flex-column align-items-center mt-5">
          <p>{this.state.progressMessage}</p>
          <img src={aegisImgLoader} alt="Aegis" className="mt-5"
            style={{ cursor: 'pointer', height: '250px', width: '250px' }}
            onClick={this.onInitialiseApp}
          />
        </div>
        <button onClick={this.onAddTeamHeroes}>Add Team Heroes</button>
      </div>
    );
  }
}