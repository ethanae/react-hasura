import * as React from 'react';
import { ITeam } from '../types';
import { withRouter } from 'react-router-dom'
import { RowHover } from './Style';
import * as moment from 'moment';

export interface IProps {
  teams: Array<ITeam>;
}

export default (props: IProps) => {
  if(!props.teams.length) {
    return <div>No teams found. The database is probably empty. ¯\_(ツ)_/¯</div>
  }
  
  return (
    <table className="table table-dark table-striped">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Last Match</th>
        </tr>
      </thead>
      <tbody>
        { 
          props.teams.map(t => {
            const Team = withRouter(({ history }) => (
              <RowHover 
                key={t.id} 
                onClick={() => history.push('/teams/'+t.team_name, { team: t })}>
                <td>
                  <img src={t.logo_url} className="img-fluid" alt="" width="50" height="50"/>
                </td>
                <td>{ t.team_name }</td>
                <td>{t.wins}</td>
                <td>{t.losses}</td>
                <td>{moment(t.last_match_time * 1000).format('D MMM YYYY')}</td>
              </RowHover>
            ));
            return <Team />;
          })
        }
      </tbody>
    </table>
  );
}