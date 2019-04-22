import * as React from 'react';
import { ITeam } from '../types';

export interface IProps {
  team: ITeam;
}

export default (props: IProps) => {
  const { team } = props;
  const lastMatchDate = new Date(team.last_match_time * 1000);
  return (
    <tr key={team.id}>
      <td><img src={team.logo_url} className="img-fluid" alt="" width="50" height="50"/></td>
      <td>{team.team_name}</td>
      <td>{team.wins}</td>
      <td>{team.losses}</td>
      <td>{`${lastMatchDate.getDate()}-${lastMatchDate.getMonth() + 1}-${lastMatchDate.getFullYear()}`}</td>
    </tr>
  )
}