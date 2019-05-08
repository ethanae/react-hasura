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
          <Link className="btn btn-link" to='/'>
            <img 
              className="img-fluid" 
              width="50" height="50"
              src="https://i.pinimg.com/originals/2d/cd/80/2dcd80c6f5a21a437313adde93b373d8.png" alt="" />
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