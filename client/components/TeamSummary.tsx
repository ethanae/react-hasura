import * as React from 'react';
import { IDota2TeamDetailsQuery } from '../types';
import { CardWrapper } from './Style';

export interface IProps {
  teamDetails: IDota2TeamDetailsQuery;
}

export default (props: IProps) => {
  const { teamDetails } = props;
  const winPercentage = teamDetails.wins / (teamDetails.losses + teamDetails.wins) * 100;
  const mostPlayed = mostPlayedHero(teamDetails.team_heros);
  const mostSuccessful = mostSuccessfulHero(teamDetails.team_heros);
  const leastSuccessful = leastSuccessfulHero(teamDetails.team_heros);
  return (
    <div>
      <div className="d-flex flex-row justify-content-between mt-3 container">
        <p>
          <span className="text-info">Rating</span>: {teamDetails.rating}
        </p>
        <p>
          <span className="text-info">Win %</span>: {winPercentage.toFixed(2)}
        </p>
        <p>
          <span className="text-success">Wins</span>:  {teamDetails.wins}
        </p>
        <p>
          <span className="text-danger">Losses</span>: {teamDetails.losses}
        </p>
      </div>
      <div className="d-flex flex-row flex-wrap justify-content-center">
       {mostPlayed && <CardWrapper clickable={false} className="card m-2 w-25 small">
          <div className="card-body">
            <h4 className="card-title text-right text-bold text-primary">Most Played Hero</h4>
            <h5 className="card-text text-center border border-light">
              {mostPlayed.hero.localized_name}
            </h5>
            <p className="card-text">
              <span className="text-info">Played</span>: {mostPlayed.games_played}
            </p>
            <p className="card-text">
              <span className="text-success">Wins</span>: {mostPlayed.wins}
            </p>
            <p className="card-text">
              <span className="text-secondary">Primary attr</span>: {mostPlayed.hero.primary_attr}
            </p>
            <p className="card-text">
              <span className="text-secondary">Attack type</span>: {mostPlayed.hero.attack_type}
            </p>
            <p className="card-text">
              <span className="text-secondary">Roles</span>: <br/> 
              {mostPlayed.hero.roles.join(', ')}
            </p>
          </div>
        </CardWrapper>}

        { mostSuccessful && <CardWrapper clickable={false} className="card m-2 w-25 small">
          <div className="card-body">
            <h4 className="card-title text-right text-bold text-primary">Most Successful Hero</h4>
            <h5 className="card-text text-center border border-light">
              {mostSuccessful.hero.localized_name}
            </h5>
            <p className="card-text">
              <span className="text-info">Played</span>: {mostSuccessful.games_played}
            </p>
            <p className="card-text">
              <span className="text-success">Wins</span>: {mostSuccessful.wins}
            </p>
            <p className="card-text">
              <span className="text-secondary">Primary attr</span>: {mostSuccessful.hero.primary_attr}
            </p>
            <p className="card-text">
              <span className="text-secondary">Attack type</span>: {mostSuccessful.hero.attack_type}
            </p>
            <p className="card-text">
              <span className="text-secondary">Roles</span>: <br/> 
              {mostSuccessful.hero.roles.join(', ')}
            </p>
          </div>
        </CardWrapper>}

        {leastSuccessful && <CardWrapper clickable={false} className="card m-2 w-25 small">
          <div className="card-body">
            <h4 className="card-title text-right text-bold text-primary">Least Successful Hero</h4>
            <h5 className="card-text text-center border border-light">
              {leastSuccessful.hero.localized_name}
            </h5>
            <p className="card-text">
              <span className="text-info">Played</span>: {leastSuccessful.games_played}
            </p>
            <p className="card-text">
              <span className="text-success">Wins</span>: {leastSuccessful.wins}
            </p>
            <p className="card-text">
              <span className="text-secondary">Primary attr</span>: {leastSuccessful.hero.primary_attr}
            </p>
            <p className="card-text">
              <span className="text-secondary">Attack type</span>: {leastSuccessful.hero.attack_type}
            </p>
            <p className="card-text">
              <span className="text-secondary">Roles</span>: <br/> 
              {leastSuccessful.hero.roles.join(', ')}
            </p>
          </div>
        </CardWrapper>}
      </div>
    </div>
  );
};

function mostPlayedHero(heroesPlayed: IDota2TeamDetailsQuery['team_heros']) {
  return heroesPlayed.sort((a, b) => b.games_played - a.games_played)[0];
}

function mostSuccessfulHero(heroesPlayed: IDota2TeamDetailsQuery['team_heros']) {
  return heroesPlayed.sort((a, b) => b.wins - a.wins)[0];
}

function leastSuccessfulHero(heroesPlayed: IDota2TeamDetailsQuery['team_heros']) {
  return heroesPlayed.sort((a, b) => a.wins - b.wins)[0];
}