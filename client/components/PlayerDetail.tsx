import * as React from 'react';
import { IPlayerNestedTeam, IRecentPlayerMatchResponse } from '../types';
import { Query } from 'react-apollo';
import { queryPlayerDetail } from '../data/query';
import { createToast } from '../utils';
import { CardWrapper } from './Style';
const dota2Loader = require('../assets/qwe-loader.gif');
import PlayerMatchDetails from './PlayerMatchDetails';


export interface IProps {
  location: { state: { player: IPlayerNestedTeam } };
}

export default (props: IProps) => {
  const { player } = props.location && props.location.state;
  if (!player) return <div>Uknown player</div>;

  return (
    <div className="container">

      <Query<IRecentPlayerMatchResponse>
        query={queryPlayerDetail}
        variables={{ accountId: player.account_id, matchesLimit: 5 }}>
        {
          ({ data, loading, error }) => {
            if (loading) return <img src={dota2Loader} />;
            if (error) {
              createToast({ message: 'There was an error getting player details.', type: 'error' });
              return null;
            }
            return data && (
              <div>
                <h1 className="text-light border-bottom">{data.dota2_player[0].player_name} - {data.dota2_player[0].team.team_name}</h1>
                <div className="d-flex justify-content-center text-light">
                  <div className="w-100 mt-3">
                    <h5>Recent Matches</h5>
                    <div className="d-flex flex-column">
                      {data.dota2_player[0].player_recent_matches.map(rm => <PlayerMatchDetails key={rm.match_id} match={rm} />)}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }
      </Query>
    </div>
  );
};