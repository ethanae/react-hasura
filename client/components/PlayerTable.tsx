import * as React from 'react';
import { IPlayer } from '../types';
import { RowHover } from './Style';
import * as moment from 'moment';

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
            props.players.map(p => 
              <RowHover key={p.account_id}>
                <td><img src={p.avatar_full} className="img-fluid" alt="" width="50" height="50"/></td>
                <td>{p.player_name}</td>
                <td>{p.country_code}</td>
                <td></td>
                <td>{moment(p.last_match_time).format('D MMM YYYY')}</td>
              </RowHover>
            )
          }
        </tbody>
      </table>
    </div>
  );
}