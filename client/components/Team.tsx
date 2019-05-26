import * as React from 'react';
import { ITeam, IPlayer } from '../types';
import { ReactComponentLike } from 'prop-types';
import { Query } from 'react-apollo';
import { queryPlayersByTeamId } from '../data/query';
import { RotateSpinner } from 'react-spinners-kit';
import { createToast } from '../utils';
import PlayerCard from './PlayerCard';

export interface IProps {
  team: ITeam;
  location: { state: { team: ITeam } },
  render: (props: any) => ReactComponentLike
}

export default (props: IProps) => {
  const { team } = props.location && props.location.state && props.location.state;
  return (
    <div className="text-light">
      <div className="d-flex p-2 justify-content-end">
        <img src={team.logo_url} className="m-2" alt="" width="100" height="100"/>
        <h1 className="align-self-center">{team.team_name}</h1>
      </div>
      {
        props.render && !team ? props.render(props)
        : 
        <Query<{ dota2_player: IPlayer[] }> query={queryPlayersByTeamId} variables={{ teamId: team.team_id }}>
          {
            ({ data, loading, error }) => {
              if (loading) return <RotateSpinner />;
              if (error) {
                createToast({ 
                  message: `There was an error loading players for ${team.team_name}.`, 
                  type: 'error' 
                });
                return null;
              }
              console.log(data)
              return (
                <div>
                  { 
                    data && 
                    data.dota2_player.map(p => <PlayerCard key={p.account_id} player={p} />) 
                  }
                </div>
              );
            }
          }
        </Query>
      }
    </div>
  );
};