import * as React from 'react';
import { IPlayer } from '../types';
import { getPlayersByTeamId } from '../data/query';

export interface IProps {
  location?: {
    state: {
      teamId: number;
    }
  }
}

export default class extends React.Component<IProps, { players: IPlayer[] }> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      players: []
    }
  }

  componentDidMount() {
    if(!this.props.location || !this.props.location.state) return;

    getPlayersByTeamId(this.props.location.state.teamId)
      .then(players => this.setState({ players }))
      .catch(err => {
        throw err;
      });
  }

  render() {
    const players = this.state.players;
    return (
      <div>
        <h1>Players</h1>
        <div>
          {
            players.length ? players.map(p => (
              <div key={p.account_id}>
                {p.player_name}
              </div>
            ))
            :
            'no players'
          }
        </div>
      </div>
    );
  }
}