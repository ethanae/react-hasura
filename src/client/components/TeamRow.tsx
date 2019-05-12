import * as React from 'react';
import { ITeam } from '../types';
import * as moment from 'moment';
import { RowHover } from './Style';

export interface IProps {
  team: ITeam;
  onTeamClick?: () => any;
};

export default (props: IProps) => {
  const { team, onTeamClick } = props;
  return (
    <RowHover key={team.id} onClick={onTeamClick}>
      <td><img src='' className="img-fluid" alt="" width="50" height="50"/></td>
      <td>{team.team_name || team.tag}</td>
      <td>{team.wins}</td>
      <td>{team.losses}</td>
      <td>{moment(team.last_match_time * 1000).format('D MMM YYYY')}</td>
    </RowHover>
  )
};