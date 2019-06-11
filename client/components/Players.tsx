import * as React from 'react';
import { IDota2PlayerQueryResponse, IDota2PlayerAggregateResponse, IDota2PlayerTeamNestedQueryResponse } from '../types';
import { queryPlayersByTeamId, queryPlayersPaged } from '../data/query';
import PlayerCard from './PlayerCard';
import { Query } from 'react-apollo';
import PlayerTable from './SimpleTable';
import Paginate from './Paginate';
import { createToast } from '../utils';
import { RowHover } from './Style';
import { withRouter } from 'react-router';
import * as moment from 'moment';
const dota2Loader = require('../assets/qwe-loader.gif');


export default class extends React.Component<{}, { offset: number; limit: number; currentPage: number; }> {
  constructor(props: {}) {
    super(props);
    this.state = {
      offset: 0,
      limit: 10,
      currentPage: 1
    };
  }

  onNextPage = () => {
    const { offset, limit, currentPage } = this.state;
    this.setState({ offset: offset + limit, limit, currentPage: currentPage + 1 });
  }

  onPrevPage = () => {
    if (this.state.offset === 0) return;
    const { offset, limit, currentPage } = this.state;
    this.setState({ offset: offset - limit, limit, currentPage: currentPage - 1 });
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-light">Players</h1>
        <div className="d-flex justify-content-center">
          {
            <Query<IDota2PlayerTeamNestedQueryResponse & IDota2PlayerAggregateResponse>
              query={queryPlayersPaged(this.state.offset, this.state.limit)}>
              {
                ({ data, error, loading }) => {
                  if (error) {
                    createToast({ message: 'There was an error fetching players.', type: 'error' });
                    return null;
                  }
                  if (loading) return <img src={dota2Loader} />;
                  if (!data || !data.dota2_player.length) return <p className="text-light">No players found</p>
                  return (
                    <div>
                      <PlayerTable tableHeaders={['', 'Name', 'Country', 'Team', 'Last Match']} 
                        render={() => {
                          return data.dota2_player.map(p => {
                            const Player = withRouter(({ history }) => {
                              return <RowHover 
                                key={p.account_id}
                                onClick={() => history.push('/player/'+p.account_id, { player: p })}>
                                <td><img src={p.avatar_full} className="img-fluid" alt="" width="50" height="50"/></td>
                                <td>{p.player_name}</td>
                                <td>{p.country_code}</td>
                                <td>{p.team.team_name}</td>
                                <td>{moment(p.last_match_time).format('D MMM YYYY')}</td>
                              </RowHover>
                            });
                            return <Player />;
                          });
                        }}
                      />
                      <Paginate
                        label={`${this.state.currentPage}/${Math.ceil(data.dota2_player_aggregate.aggregate.count / this.state.limit)}`}
                        onPageBackward={this.onPrevPage}
                        onPageForward={this.onNextPage} />
                    </div>
                  );
                }
              }
            </Query>
          }
        </div>
      </div>
    );
  }
}