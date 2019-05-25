import * as React from 'react';
import { ITeam } from '../types';
import { ReactComponentLike } from 'prop-types';

export interface IProps {
  team: ITeam;
  location: { state: any },
  render: (props: any) => ReactComponentLike
}

export default (props: IProps) => {
  const team = props.location && props.location.state && props.location.state;
  return (
    <div>
      <h1>{team.team_name}</h1>
      {props.render && props.render(props)}
    </div>
  );
};