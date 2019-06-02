import * as React from 'react';
import { ITeam, IPlayer, IDota2TeamDetailsQueryResponse } from '../types';
import { Query } from 'react-apollo';
import { queryPlayersByTeamId, queryTeamHeroes } from '../data/query';
const dota2Loader = require('../assets/qwe-loader.gif');
import { createToast } from '../utils';
import PlayerCard from './PlayerCard';
import TeamSummary from './TeamSummary';

export interface IProps {
  team: ITeam;
  location: { state: { team: ITeam } }
}

export default (props: IProps) => {
  const { team } = props.location && props.location.state && props.location.state;
  return (
    <div className="text-light container">
      <div className="d-flex p-2 justify-content-end">
        <img src={team.logo_url} className="m-2" alt="" width="100" height="100"/>
        <h1 className="align-self-center">{team.team_name}</h1>
      </div>
      {       
        <Query<IDota2TeamDetailsQueryResponse> query={queryTeamHeroes} variables={{ teamId: team.team_id }}>
          {
            ({ data, loading, error }) => {
              if (loading) return <img src={dota2Loader} />;
              if (error) {
                createToast({ 
                  message: `There was an error loading players for ${team.team_name}.`, 
                  type: 'error' 
                });
                return null;
              }
              if(!data || !data.dota2_team) { return <h3>No team details found</h3> }
              console.log(data.dota2_team);
              return <TeamSummary teamDetails={data.dota2_team[0]} />
            }
          }
        </Query>

        // <Query<{ dota2_player: IPlayer[] }> 
        //   query={queryPlayersByTeamId} 
        //   variables={{ teamId: team.team_id }}>
        //   {
        //     ({ data, loading, error }) => {
        //       if (loading) return <img src={dota2Loader}/>;
        //       if (error) {
        //         createToast({ 
        //           message: `There was an error loading players for ${team.team_name}.`, 
        //           type: 'error' 
        //         });
        //         return null;
        //       }

        //       return (
        //         <div className="d-flex flex-row flex-wrap justify-content-center">
        //           { 
        //             data && data.dota2_player.length ? 
        //               data.dota2_player.map(p => <PlayerCard key={p.account_id} player={p} />) 
        //               :
        //               <h3>No players found</h3>
        //           }
        //         </div>
        //       );
        //     }
        //   }
        // </Query>
      }
    </div>
  );
};