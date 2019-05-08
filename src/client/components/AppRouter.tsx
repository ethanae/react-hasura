import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Teams from './Teams';
// import Players from './Players';
import App from '../containers/App';

export default () => {
  return (
    <Router>
      <div>
        <nav>
          <Link className="btn btn-link" to='/' style={{ animation: 'rotation 2s infinite linear;' }}>
            <img className="img-fluid" width="50" height="50" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDy5giSRi_wNPPcslPqSp8T2Ti0jQ9wdGp_tdvD5umEQuG0b32" alt=""/>
          </Link>
          <Link className="btn btn-link" to='/teams'>Teams</Link>
          <Link className="btn btn-link" to='/players'>Players</Link>
          <Link className="btn btn-link" to='/heroes'>Heroes</Link>
          <Link className="btn btn-link" to='/stats'>Stats</Link>
        </nav>

        <Route className="btn btn-link" path="/" exact component={App} />
        <Route className="btn btn-link" path="/teams/" component={Teams} />
      </div>
    </Router>
  )
};