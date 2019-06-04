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
    window.addEventListener('notify', (this.onNotify as EventListener));
  }

  componentWillMount() {
    window.removeEventListener('notify', (this.onNotify as EventListener));
  }

  onNotify = (e: CustomEvent) => this.setState({ progressMessage: e.detail });

  onInitialiseApp = () => {
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
            <img src={aegisImgLoader} alt="Aegis" className="mt-5" 
              style={{ cursor: 'pointer', height: '250px', width: '250px' }}
              onClick={this.onInitialiseApp}
            />
          </div>
      </div>
    );
  }
}