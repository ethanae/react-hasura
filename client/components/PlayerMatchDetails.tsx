import * as React from 'react';
import { IRecentMatch } from '../types';
import * as moment from 'moment';
import { CardWrapper } from './Style';

type Props = { openDetailsOnInit?: boolean, match: IRecentMatch };

export default class extends React.Component<Props, { expandDetails: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { expandDetails: !!props.openDetailsOnInit }
  }
  onCardHover = (e: React.MouseEvent) => {
    this.setState({ expandDetails: true });
  }

  onCardHoverExit = (e: React.MouseEvent) => {
    this.setState({ expandDetails: false });
  }

  render() {
    const { match } = this.props;
    return (
      <CardWrapper
        clickable={false}
        className="card text-sm p-2"
        onMouseEnter={this.onCardHover}
        onMouseLeave={this.onCardHoverExit}
      >
        <div className="flex-row" >
          <div>
            <div className="d-flex justify-content-around">
              <span>{moment(match.start_time * 1000).format('D MMM YYYY')}</span>
              <span className="text-warning">{match.hero.localized_name}</span>
              <span className={match.radiant_win ? 'text-success' : 'text-danger'}>
                {match.radiant_win ? 'Radiant Win' : 'Dire Win'}
              </span>
            </div>
          { this.state.expandDetails &&
              <div className="d-flex flex-row justify-content-between border-top mt-1 p-2">
                <div className="">
                  <p>Kills: {match.kills}</p>
                  <p>Deaths: {match.deaths}</p>
                  <p>Assists: {match.assists}</p>
                </div>
                <div>
                  <p>Last Hits: {match.last_hits}</p>
                  <p>Gold Per Min: {match.gold_per_min}</p>
                  <p>XP Per Min: {match.xp_per_min}</p>
                </div>
                <div>
                  <p>Tower damage: {match.tower_damage}</p>
                  <p>Duration: {Math.ceil(match.duration / 60)}min</p>
                </div>
              </div>
            }
          </div>
        </div>
      </CardWrapper>
    );
  }
};