import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const dota2Logo = require('../assets/dota-2-static.png');
const dota2LogoEmbers = require('../assets/dota-2-embers.gif');

import Teams from './Teams';
import Players from './Players';
import Home from './Home';
import Team from './Team';
import { Nav } from './Style';
import PlayerDetail from './PlayerDetail';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';
import { Client } from '../data/apollo';

const GET_PROGRESS = gql`{
    progress @client
    progressMessage @client
  }
`;

class App extends React.Component<{ client: Client }, { progressMessage: string; progress: number | null; }> {
  constructor(props: { client: Client }) {
    super(props);
    this.state = {
      progressMessage: 'Click the Aegis to initialise the app',
      progress: null,
    }
  }

  onInitialiseApp = () => {
    const ws = new WebSocket('ws://localhost:3000/init');
    ws.onmessage = this.onAppInitProgress;
    ws.onclose = e => {
      this.addPlayerMatches();
    };
  }

  onAppInitProgress = (e: MessageEvent) => {
    const data = JSON.parse(e.data);
    const progress = Math.round((data.progress / data.total) * 100);

    this.props.client.writeData({
      data: { 
        progress,
        progressMessage: data.message
      }
    });
    this.setState({ progressMessage: data.message, progress });
  }

  addTeamHeroes = () => {
    const ws = new WebSocket('ws://localhost:3000/team/heroes');
    ws.onmessage = this.onAppInitProgress;
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
      <Router>
        <div className="mb-5">
          <Nav className="d-flex align-items-center flex-row flex-wrap">
            <Link className="btn btn-link" to='/'>
              <img
                className="img-fluid"
                width="80" height="80"
                src={dota2Logo} alt="Dota 2"
                onMouseOver={e => (e.target as HTMLImageElement).setAttribute('src', dota2LogoEmbers)}
                onMouseLeave={e => (e.target as HTMLImageElement).setAttribute('src', dota2Logo)}
              />
            </Link>
            <Link className="btn btn-link n-link" to='/teams'>Teams</Link>
            <Link className="btn btn-link n-link" to='/players'>Players</Link>
            <Link className="btn btn-link n-link" to='/heroes'>Heroes</Link>
            <Link className="btn btn-link n-link" to='/stats'>Stats</Link>
            <span className="ml-auto">
              <Query<{ progress: number }> query={GET_PROGRESS}>
                {
                  ({ data, error }) => {
                    if (error) {
                      return null;
                    }
                    if (data && data.progress) {
                      return (
                        <CircularProgressbar 
                          styles={{ root: { height: '20%', width: '20%' } }} 
                          value={data.progress} 
                          text={`${data.progress}%`} 
                        />
                      );
                    }
                    return null;
                  }
                }
              </Query>
            </span>
          </Nav>

          <Route path="/" exact render={props => {
            return (
              <Home {...props}
                client={this.props.client}
                dataProgress={{ 
                  message: this.state.progressMessage, 
                  progress: this.state.progress 
                }}
                onInitialiseApp={this.onInitialiseApp}
              />
            )}
          } />
          <Route path="/teams/:teamName" component={Team} />
          <Route exact path="/teams" component={Teams} />
          <Route path="/players" component={Players} />
          <Route path="/player" component={PlayerDetail} />
        </div>
      </Router>
    )
  }
}

export default withApollo(App);