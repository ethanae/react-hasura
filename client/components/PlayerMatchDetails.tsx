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
        clickable={true}
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
              <div className="d-flex flex-row justify-content-between">
                <div className="">
                  <p title="Kills">K: {match.kills}</p>
                  <p title="Deaths">D: {match.deaths}</p>
                  <p title="Assists">A: {match.assists}</p>
                </div>
                <div>
                  <p title="Last hits">LH: {match.last_hits}</p>
                  <p title="Gold per minute">GPM: {match.gold_per_min}</p>
                  <p title="XP per minute">XPM: {match.xp_per_min}</p>
                </div>
                <div>
                  <p title="Tower damage">TD: {match.tower_damage}</p>
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