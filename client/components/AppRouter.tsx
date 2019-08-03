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

export default class extends React.Component<{}, { updateMessage: string; }> {
  constructor(props: {}) {
    super(props);
    this.state = { updateMessage: '' };
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
            <Link className="btn btn-link n-link" to='/teams'>
              Teams
            </Link>
            <Link className="btn btn-link n-link" to='/players'>Players</Link>
            <Link className="btn btn-link n-link" to='/heroes'>Heroes</Link>
            <Link className="btn btn-link n-link" to='/stats'>Stats</Link>
            <span className="pull-right text-light text-sm">
              <CircularProgressbar styles={{ root: { height: '100px', width: '100px' } }} value={this.state.progress} text={`${this.state.progress}%`} />
            </span>
          </Nav>

          <Route path="/" exact component={Home} />
          <Route path="/teams/:teamName" component={Team} />
          <Route exact path="/teams" component={Teams} />
          <Route path="/players" component={Players} />
          <Route path="/player" component={PlayerDetail} />
        </div>
      </Router>
    )
  }
};