import * as React from 'react';
import { IDota2PlayerQueryResponse, IDota2PlayerAggregateResponse, IDota2PlayerTeamNestedQueryResponse } from '../types';
import { queryPlayersByTeamId, queryPlayersPaged } from '../data/query';
import PlayerCard from './PlayerCard';
import { Query } from 'react-apollo';
import { RotateSpinner } from 'react-spinners-kit';
import PlayerTable from './PlayerTable';
import Paginate from './Paginate';
import { createToast } from '../utils';

export interface IProps {
  location?: {
    state: {
      teamId: number;
    }
  }
}

export default class extends React.Component<IProps, { offset: number; limit: number; currentPage: number; }> {
  constructor(props: IProps) {
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
        <div className="justify-content-center">
          {
            // split these 2 properly
            // problem occurs when already viewing player cards and clicking players link
            this.props.location && this.props.location.state && this.props.location.state.teamId ?
              <Query<IDota2PlayerQueryResponse, { teamId: number }>
                query={queryPlayersByTeamId}
                variables={{ teamId: this.props.location.state.teamId }}>
                {
                  ({ data, error, loading }) => {
                    if (error) return <p>Error loading players</p>;
                    if (loading) return <RotateSpinner />;
                    if (!data || !data.dota2_player.length) return <p className="text-light">No players found</p>
                    return data.dota2_player.map(p => <PlayerCard key={p.account_id} player={p} />);
                  }
                }
              </Query>
              :
              <Query<IDota2PlayerTeamNestedQueryResponse & IDota2PlayerAggregateResponse>
                query={queryPlayersPaged(this.state.offset, this.state.limit)}>
                {
                  ({ data, error, loading }) => {
                    if (error) {
                      createToast({ message: 'There was an error fetching players.', type: 'error' });
                      return null;
                    }
                    if (loading) return <RotateSpinner />;
                    if (!data || !data.dota2_player.length) return <p className="text-light">No players found</p>
                    return (
                      <div>
                        <PlayerTable
                          players={data.dota2_player}
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