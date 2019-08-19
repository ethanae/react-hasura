import * as React from 'react';
import { IPlayer } from '../types';
import { CardWrapper } from './Style';

import ProgressiveImage from 'react-progressive-image';
const dota2Loader = require('../assets/qwe-loader.gif');

export interface IProps {
  player: IPlayer;
  onClick: React.MouseEventHandler
}

export default (props: IProps) => {
  const { avatar_full, player_name, country_code } = props.player;

  return (
    <CardWrapper 
      clickable={true} 
      className="card p-2 m-2" 
      onClick={props.onClick}>
      <ProgressiveImage src={avatar_full} placeholder="">
        {(src: string, loading: boolean) => (
          loading ?
            <div className="p-3 m-auto"><img src={dota2Loader} width="100" height="100"/></div> :
            <img className="card-img-top" src={src} />
        )}
      </ProgressiveImage>
      <div className="card-body">
        <h4 className="card-title text-bold">{player_name}</h4>
        <p className="card-text">Country: {country_code}</p>
      </div>
    </CardWrapper>
  );
}