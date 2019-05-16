import * as React from 'react';
import { IPlayer } from '../types';
import { queryPlayersByTeamId } from '../data/query';
import PlayerCard from './PlayerCard';
import { Query } from 'react-apollo';
import { RotateSpinner } from 'react-spinners-kit';

export interface IProps {
  location?: {
    state: {
      teamId: number;
    }
  }
}

export default (props: IProps) => {
  return (
    <div className="container">
      <h1>Players</h1>
      <div className="justify-content-center row">
        {
          props.location && props.location.state && props.location.state.teamId ?
            <Query<IDota2Player, { teamId: number }> query={queryPlayersByTeamId} variables={{ teamId: props.location.state.teamId }}>
              {
                ({ data, error, loading }) => {
                  if (error) return <p>Error loading players</p>;
                  if (loading) return <RotateSpinner />;
                  if (!data || !data.dota2_player.length) return <p>No players found</p>
                  return data.dota2_player.map(p => <PlayerCard key={p.account_id} player={p} />);
                }
              }
            </Query>
            : <p>Swiggity</p>
        }
      </div>
    </div>
  );
}

export interface IDota2Player {
  dota2_player: IPlayer[];
}