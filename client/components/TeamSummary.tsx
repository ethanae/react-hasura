import * as React from 'react';
import { IDota2TeamDetailsQuery } from '../types';

export interface IProps {
  teamDetails: IDota2TeamDetailsQuery;
}

export default (props: IProps) => {
  const { teamDetails } = props;
  const winPercentage = teamDetails.wins / (teamDetails.losses + teamDetails.wins) * 100;
  return (
    <div>
      <div className="d-flex flex-row justify-content-between mt-3">
        <p>
          <span className="text-info">Rating</span>: {teamDetails.rating}
        </p>
        <p>
          <span className="text-info">Win %</span>: {winPercentage.toFixed(2)}
        </p>
        <p>
          <span className="text-success">Wins</span>:  {teamDetails.wins}
        </p>
        <p>
          <span className="text-danger">Losses</span>: {teamDetails.losses}
        </p>
      </div>

    </div>
  );
};