import * as React from 'react';
import { insertTeams, insertPlayers, insertHeroes, insertTeamHeroes } from '../data/mutation';
const aegisImg = require('../assets/aegis.gif');
const aegisImgLoader = require('../assets/aegis-loader.gif');


export default class extends React.Component<{}, { progressMessage: string; }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      progressMessage: 'Click the Aegis to initialise the App'
    }
  }

  componentDidMount() {
    //@ts-ignore
    window.addEventListener('notify', (e) => {
      //@ts-ignore
      console.log('got event', e.detail);
      //@ts-ignore
      this.setState({ progressMessage: e.detail });
    })
  }

  onInitialiseApp = () => {
    // TODO: optimise to prevent ui blocking
    insertTeams()
      .then(insertPlayers)
      .then(insertHeroes)
      .then(insertTeamHeroes)
      .then(_ => this.setState({ progressMessage: 'Initialisation complete' }));
  }

  render() {
    return (
      <div className="container-fluid text-light">
        <div className="d-flex flex-column align-items-center mt-5">
          <p>{this.state.progressMessage}</p>
            <img src={aegisImg} alt="Aegis" style={{ cursor: 'pointer', height: '300px', width: '300px' }}
              onMouseOver={e => (e.target as HTMLImageElement).setAttribute('src', aegisImgLoader)}
              onMouseLeave={e => (e.target as HTMLImageElement).setAttribute('src', aegisImg)}
              onClick={this.onInitialiseApp}
            />
          </div>
      </div>
    );
  }
}