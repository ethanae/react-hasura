import * as React from 'react';
import { IPlayerNestedTeam } from '../types';
import { RowHover } from './Style';
import * as moment from 'moment';
import { withRouter } from 'react-router';

export interface IProps {
  players: Array<IPlayerNestedTeam>;
  render?: () => JSX.Element;
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
              const Player = withRouter(({ history }) => {
                return <RowHover 
                  key={p.account_id}
                  onClick={() => history.push('/player/'+p.account_id, { player: p })}>
                  <td><img src={p.avatar_full} className="img-fluid" alt="" width="50" height="50"/></td>
                  <td>{p.player_name}</td>
                  <td>{p.country_code}</td>
                  <td>{p.team.team_name}</td>
                  <td>{moment(p.last_match_time).format('D MMM YYYY')}</td>
                </RowHover>
              });
              return <Player />
            })
          }
        </tbody>
      </table>
      { props.render && props.render() }
    </div>
  );
}