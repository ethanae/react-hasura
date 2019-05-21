import * as React from 'react';
import { IPlayer } from '../types';
import * as moment from 'moment';
import { RowHover } from './Style';

export interface IProps {
  player: IPlayer;
};

export default (props: IProps) => {
  const { player } = props;
  return (
    <RowHover key={player.account_id}>
      <td><img src={player.avatar_full} className="img-fluid" alt="" width="50" height="50"/></td>
      <td>{player.player_name}</td>
      <td>{player.country_code}</td>
      <td></td>
      <td>{moment(player.last_match_time).format('D MMM YYYY')}</td>
    </RowHover>
  )
};