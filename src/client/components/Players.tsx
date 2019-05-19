import * as React from 'react';
import { IDota2PlayerQueryResponse } from '../types';
import { queryPlayersByTeamId, queryPlayersPaged } from '../data/query';
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
            <Query<IDota2PlayerQueryResponse, { teamId: number }> query={queryPlayersByTeamId} variables={{ teamId: props.location.state.teamId }}>
              {
                ({ data, error, loading }) => {
                  if (error) return <p>Error loading players</p>;
                  if (loading) return <RotateSpinner />;
                  if (!data || !data.dota2_player.length) return <p>No players found</p>
                  return data.dota2_player.map(p => <PlayerCard key={p.account_id} player={p} />);
                }
              }
            </Query>
            : 
            <Query<IDota2PlayerQueryResponse> query={queryPlayersPaged} variables={ { limit: 10, offset: 10 } }>
              {
                ({ data, error, loading }) => {
                  if (error) return <p>Error loading players</p>;
                  if (loading) return <RotateSpinner />;
                  if (!data || !data.dota2_player.length) return <p>No players found</p>
                  return data.dota2_player.map(p => <PlayerCard key={p.account_id} player={p} />);
                }
              }
            </Query>
        }
      </div>
    </div>
  );
}