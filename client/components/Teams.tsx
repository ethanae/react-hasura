import * as React from 'react';
import { Subscription } from 'react-apollo';
import { RotateSpinner } from "react-spinners-kit";

import { createToast } from '../utils';
import { teamSubscriber } from '../data/subscription';
import TeamTable from './TeamTable';
import { IDota2TeamQueryResponse } from '../types';

export default () => {
  return (
    <div className="container-fluid">
      <h1>Teams</h1>
      <div className="justify-content-center row">
        <Subscription<IDota2TeamQueryResponse, {}> subscription={teamSubscriber}>
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
                </div>
              )
            }
          }
        </Subscription>
      </div>
    </div>
  );
}