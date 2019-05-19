import * as React from 'react';
import { IPlayer } from '../types';
import PlayerRow from './PlayerRow';
// import { withRouter } from 'react-router-dom'

export interface IProps {
  data: Array<IPlayer>;
}

export default (props: IProps) => {
  if(!props.data.length) {
    return <div>No players found. The database is probably empty. ¯\_(ツ)_/¯</div>
  }
  
  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Country</th>
          <th>Team</th>
          <th>Last Match</th>
        </tr>
      </thead>
      <tbody>
        { 
          props.data.map(p => {
            return <PlayerRow player={p} key={p.account_id} />;
          })
        }
      </tbody>
    </table>
  );
}