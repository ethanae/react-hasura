import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Teams from './Teams';
import Players from './Players';
import Home from './Home';
import Team from './Team';

export default () => {
  return (
    <Router>
      <div>
        <nav>
          <Link className="btn btn-link" to='/'>
            <img
              className="img-fluid"
              width="50" height="50"
              src="https://png.pngtree.com/svg/20161009/c24277a29e.png" alt="Dota 2" />
          </Link>
          <Link className="btn btn-link" to='/teams'>Teams</Link>
          <Link className="btn btn-link" to='/players'>Players</Link>
          <Link className="btn btn-link" to='/heroes'>Heroes</Link>
          <Link className="btn btn-link" to='/stats'>Stats</Link>
        </nav>

        <Route className="btn btn-link" path="/" exact component={Home} />
        <Route className="btn btn-link" path="/teams/:teamName" component={Team} />
        <Route className="btn btn-link" path="/teams" component={Teams} />
        <Route className="btn btn-link" path="/players" component={Players} />
      </div>
    </Router>
  )
};