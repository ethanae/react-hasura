import * as React from 'react';
import { Subscription } from 'react-apollo';

import { createToast } from '../utils';
import { teamSubscriber } from '../data/subscription';
import TeamTable from './TeamTable';

export default () => {
  return (
    <Subscription subscription={teamSubscriber}>
      {
        (sub: any) => {
          if (sub.loading) return (
            <img 
              width="200" height="200" 
              src="https://cdn0.iconfinder.com/data/icons/coloricons/50/50X50-10-512.png" alt="" />
          );
          if (sub.error) {
            createToast({ message: 'There was an error creating the subscription.', type: 'error' });
            return null;
          }
          return (
            <div>
              <TeamTable data={sub.data.dota2_team} />
            </div>
          )
        }
      }
    </Subscription>
  );
}