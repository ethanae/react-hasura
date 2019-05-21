import * as React from 'react';
import { IPlayer } from '../types';
import PlayerRow from './PlayerRow';
import Paginate from './Paginate';
// import { withRouter } from 'react-router-dom'

export interface IProps {
  players: Array<IPlayer>;
}

export default (props: IProps) => {

  if (!props.players.length) {
    return <div>No players found. The database is probably empty. ¯\_(ツ)_/¯</div>;
  }

  return (
    <div>
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
            props.players.map(p => {
              return <PlayerRow player={p} key={p.account_id} />;
            })
          }
        </tbody>
      </table>
    </div>
  );
}