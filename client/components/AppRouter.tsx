import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const dota2Logo = require('../assets/dota-2-static.png');

import Teams from './Teams';
import Players from './Players';
import Home from './Home';
import Team from './Team';
import { Nav } from './Style';

export default () => {
  return (
    <Router>
      <div>
        <Nav>
          <Link className="btn btn-link" to='/'>
            <img
              className="img-fluid"
              width="80" height="80"
              src={dota2Logo} alt="Dota 2" />
          </Link>
          <Link className="btn btn-link" to='/teams'>Teams</Link>
          <Link className="btn btn-link" to='/players'>Players</Link>
          <Link className="btn btn-link" to='/heroes'>Heroes</Link>
          <Link className="btn btn-link" to='/stats'>Stats</Link>
        </Nav>

        <Route path="/" exact component={Home} />
        <Route path="/teams/:teamName" component={Team} />
        <Route exact path="/teams" component={Teams} />
        <Route path="/players" component={Players} />
      </div>
    </Router>
  )
};