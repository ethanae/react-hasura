import * as React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
const aegisImgLoader = require('../assets/aegis-loader.gif');

export default class extends React.Component<{}, { progressMessage: string; progress: number; initStarted: boolean; initFinished: boolean; }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progressMessage: 'Click the Aegis to initialise the App',
      progress: 0,
      initStarted: false,
      initFinished: false
    }
  }

  onInitialiseApp = () => {
    this.setState({ initStarted: true });
    const ws = new WebSocket('ws://localhost:3000/init');
    ws.onmessage = this.onAppInitProgress;
    ws.onclose = e => {
      this.addPlayerMatches();
    };
  }

  onAppInitProgress = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    this.setState({
      progress: Math.round((data.progress / data.total) * 100),
      progressMessage: data.message
    });
  }

  addTeamHeroes = () => {
    const ws = new WebSocket('ws://localhost:3000/team/heroes');
    ws.onmessage = this.onAppInitProgress;
    ws.onclose = e => {
      this.setState({ initFinished: true });
    };
  }

  addPlayerMatches = () => {
    const ws = new WebSocket('ws://localhost:3000/player/matches');
    ws.onmessage = this.onAppInitProgress;
    ws.onclose = e => {
      this.addTeamHeroes();
    };
  }

  render() {
    return (
      <div className="container-fluid text-light">
        <div className="d-flex flex-column align-items-center mt-5">
          <p>{this.state.progressMessage}</p>
          {
            !this.state.initStarted ?
              <img src={aegisImgLoader} alt="Aegis" className="mt-5"
                style={{ cursor: 'pointer', height: '250px', width: '250px' }}
                onClick={this.onInitialiseApp}
              />
              :
              <CircularProgressbar
                styles={{ root: { height: '20%', width: '20%' } }}
                value={this.state.progress}
                text={`${this.state.progress}%`} />
          }
        </div>
      </div>
    );
  }
}