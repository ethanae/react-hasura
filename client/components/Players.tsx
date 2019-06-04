import * as React from 'react';
import { IDota2PlayerQueryResponse, IDota2PlayerAggregateResponse, IDota2PlayerTeamNestedQueryResponse } from '../types';
import { queryPlayersByTeamId, queryPlayersPaged } from '../data/query';
import PlayerCard from './PlayerCard';
import { Query } from 'react-apollo';
import PlayerTable from './PlayerTable';
import Paginate from './Paginate';
import { createToast } from '../utils';
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
                      <PlayerTable players={data.dota2_player} render={() => (
                        <Paginate
                          label={`${this.state.currentPage}/${Math.ceil(data.dota2_player_aggregate.aggregate.count / this.state.limit)}`}
                          onPageBackward={this.onPrevPage}
                          onPageForward={this.onNextPage} />
                      )}/>
                      
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