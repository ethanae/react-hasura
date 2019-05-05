import * as React from 'react';
import { ITeam } from '../types';
import * as moment from 'moment';

export interface IProps {
  team: ITeam;
};

export default (props: IProps) => {
  const { team } = props;
  return (
    <tr key={team.id}>
      <td><img src={team.logo_url} className="img-fluid" alt="" width="50" height="50"/></td>
      <td>{team.team_name || team.tag}</td>
      <td>{team.wins}</td>
      <td>{team.losses}</td>
      <td>{moment(team.last_match_time * 1000).format('D MMM YYYY')}</td>
    </tr>
  )
};