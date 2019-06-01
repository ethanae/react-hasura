import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
const dota2Logo = require('../assets/dota-2-static.png');
const dota2LogoEmbers = require('../assets/dota-2-embers.gif');

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
        </Nav>

        <Route path="/" exact component={Home} />
        <Route path="/teams/:teamName" component={Team} />
        <Route exact path="/teams" component={Teams} />
        <Route path="/players" component={Players} />
      </div>
    </Router>
  )
};