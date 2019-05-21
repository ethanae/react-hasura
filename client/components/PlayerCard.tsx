import * as React from 'react';
import { IPlayer } from '../types';
import { PlayerWrapper } from './Style';

import ProgressiveImage from 'react-progressive-image';
import { ClassicSpinner } from 'react-spinners-kit';

export interface IProps {
  player: IPlayer;
}

export default (props: IProps) => {
  const  { avatar_full, player_name, country_code } = props.player;

  return (
    <PlayerWrapper className="card p-2 m-2 col-md-3">
      <ProgressiveImage src={avatar_full} placeholder="">
        {(src: string, loading: boolean) => (
          loading ? 
            <div className="p-3 m-auto"><ClassicSpinner size={80} color="#00ff89"/></div> :
            <img className="card-img-top" src={src}/>
        )}
      </ProgressiveImage>
      <div className="card-body">
        <h4 className="card-title text-bold">{player_name}</h4>
        <p className="card-text">Country: {country_code}</p>
      </div>
    </PlayerWrapper>
  );
}