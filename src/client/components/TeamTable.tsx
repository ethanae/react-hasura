import * as React from 'react';
import { ITeam } from '../types';
import TeamRow from './TeamRow';

export interface IProps {
  data: Array<ITeam>;
}

export default (props: IProps) => {
  return (
    <table className="table table-dark">
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
        { props.data.map(t => <TeamRow team={t} key={t.id} />) }
      </tbody>
    </table>
  );
}