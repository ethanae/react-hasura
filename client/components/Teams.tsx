import * as React from 'react';
import { Query } from 'react-apollo';
import { RotateSpinner } from "react-spinners-kit";

import { createToast } from '../utils';
import TeamTable from './TeamTable';
import { IDota2TeamQueryResponse, IDota2TeamAggregateResponse } from '../types';
import { queryTeamsPaged } from '../data/query';
import Paginate from './Paginate';

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
        <h1 className="text-light">Teams</h1>
        <div className="justify-content-center">
          <Query<IDota2TeamQueryResponse & IDota2TeamAggregateResponse> 
            query={queryTeamsPaged(this.state.offset, this.state.limit)}>
            {
              ({ data, error, loading }) => {
                if (loading) return <RotateSpinner />;
                if (error) {
                  createToast({ message: 'There was an error creating the subscription.', type: 'error' });
                  return null;
                }
                if (!data || !data.dota2_team.length) {
                  return <div>No teams found</div>;
                }
                return (
                  <div>
                    <TeamTable teams={data.dota2_team} />
                    <Paginate
                      label={`${this.state.currentPage}/${Math.ceil(data.dota2_team_aggregate.aggregate.count / this.state.limit)}`}
                      onPageBackward={this.onPrevPage}
                      onPageForward={this.onNextPage} />
                  </div>
                )
              }
            }
            </Query>
        </div>
      </div>
    );
  }
}