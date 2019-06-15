import * as React from 'react';
import { IPlayerNestedTeam, IRecentPlayerMatchResponse } from '../types';
import { Query } from 'react-apollo';
import { queryPlayerDetail } from '../data/query';
import { createToast } from '../utils';
import { CardWrapper } from './Style';
const dota2Loader = require('../assets/qwe-loader.gif');
import * as moment from 'moment';


export interface IProps {
  location: { state: { player: IPlayerNestedTeam } };
}

export default (props: IProps) => {
  const { player } = props.location && props.location.state;
  if (!player) return <div>Uknown player</div>;

  return (
    <div className="container">
      <h1 className="text-light border-bottom">{player.player_name} - {player.team.team_name}</h1>
      <div className="d-flex justify-content-center text-light">
        <Query<IRecentPlayerMatchResponse>
          query={queryPlayerDetail}
          variables={{ accountId: player.account_id, matchesLimit: 5 }}>
          {
            ({ data, loading, error }) => {
              if (loading) return <img src={dota2Loader} />;
              if (error) {
                createToast({ message: 'There was an error player detail.', type: 'error' });
                return null;
              }
              return data && (
                <div className="w-100 mt-3">
                  <h5>Recent Matches</h5>
                  <div className="d-flex flex-column">

                    {data.dota2_player[0].player_recent_matches.map(rm => (
                      <CardWrapper
                        clickable={true}
                        className="card text-sm p-2"
                        onMouseEnter={e => document.getElementById(rm.match_id.toString())!.classList.remove('d-none')}
                        onMouseLeave={e => document.getElementById(rm.match_id.toString())!.classList.add('d-none')}
                      >
                        <div>
                          <div className="d-flex justify-content-around">
                            <span>{moment(rm.start_time * 1000).format('D MMM YYYY')}</span>
                            <span className="text-warning">{rm.hero.localized_name}</span>
                            <span className={rm.radiant_win ? 'text-success' : 'text-danger'}>
                              {rm.radiant_win ? 'Radiant Win' : 'Dire Win'}
                            </span>
                          </div>
                          <div className="d-flex">
                            <div className="d-none flex-row" id={rm.match_id.toString()}>
                              <div className="d-inline-block">
                                <p>K: {rm.kills}</p>
                                <p>D: {rm.deaths}</p>
                                <p>A: {rm.assists}</p>
                              </div>
                              <div>
                                <p>LH: {rm.last_hits}</p>
                                <p>GPM: {rm.gold_per_min}</p>
                                <p>XPM: {rm.xp_per_min}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardWrapper>
                    ))}
                  </div>
                </div>
              );
            }
          }
        </Query>
      </div>
    </div>
  );
};