import DotaGqlRepository from './dota-gql-repository';
import DotaApi from './dota-api';
import {
  setTeams as _setTeams,
  setPlayers as _setPlayers,
  getTeamIDs as _getTeamIDs,
  setTeamHeroes as _setTeamHeroes,
  setHeroes as _setHeroes,
  setPlayerRecentMatches as _setPlayerRecentMatches
} from './gql-queries';
import { insert_dota2_teamVariables, insert_dota2_team } from './types/insert_dota2_team';
import { IDotaApiTeam, IDotaApiPlayer, IDotaTeamHero, IDotaHero, IRecentMatch } from './types/dota-api-types';
import { dota2_team_insert_input, dota2_player_insert_input, dota2_team_hero_insert_input } from './types/graphql-server-types';
import { insert_dota2_playerVariables, insert_dota2_player } from './types/insert_dota2_player';
import { getTeams } from './types/getTeams';
import { insert_dota2_team_hero, insert_dota2_team_heroVariables } from './types/insert_dota2_team_hero';
import { insert_dota2_hero, insert_dota2_heroVariables } from './types/insert_dota2_hero';
import { insert_dota2_player_recent_match, insert_dota2_player_recent_matchVariables } from './types/insert_dota2_player_recent_match';

export default class DotaService {
  private readonly dotaRepository: DotaGqlRepository;
  constructor() {
    this.dotaRepository = new DotaGqlRepository();
  }

  async getTeamIDs() {
    try {
      const result = await this.dotaRepository.get<getTeams>(_getTeamIDs.stringified);
      return result;
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }

  async setTeams() {
    try {
      const result = await DotaApi.fetchTeams();
      return (
        await
          this.dotaRepository
            .set<insert_dota2_team, insert_dota2_teamVariables>(_setTeams.stringified, { objects: this.mapTeams(result.data) })
      );
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }

  async setPlayers() {
    try {
      const result = await DotaApi.fetchPlayers();
      const teamIDs = (await this.getTeamIDs()).dota2_team.map(t => t.team_id);
      const players = result.data.filter(p => teamIDs.includes(p.team_id));
      return (
        await
          this.dotaRepository
            .set<insert_dota2_player, insert_dota2_playerVariables>(_setPlayers.stringified, { objects: this.mapPlayers(players) })
      );
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }

  async setTeamHeroes(teamId: number, heroes: IDotaTeamHero[]) {
    try {
      return (
        await
          this.dotaRepository
            .set<insert_dota2_team_hero, insert_dota2_team_heroVariables>(_setTeamHeroes.stringified, { objects: this.mapTeamHeroes(teamId, heroes) })
      );
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }

  async setHeroes() {
    try {
      const response = await DotaApi.fetchHeroes();
      const heroes = this.mapHeroes(response.data);
      console.log({ response: response.data });
      return (
        await
          this.dotaRepository
            .set<insert_dota2_hero, insert_dota2_heroVariables>(_setHeroes.stringified, { objects: heroes })
      );
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }

  async setPlayerMatches(accountId: number) {
    try {
      const response = await DotaApi.fetchRecentMatches(accountId);
      const matches = this.mapPlayerMatches(accountId, response.data);
      return (
        await
          this.dotaRepository
            .set<insert_dota2_player_recent_match, insert_dota2_player_recent_matchVariables>(_setPlayerRecentMatches.stringified, { objects: matches })
      );
    } catch (err) {
      throw err;
    }
  }

  private mapTeams(data: IDotaApiTeam[]): dota2_team_insert_input[] {
    return data.map(t => {
      const team = { ...t, team_name: t.name };
      delete team.name;
      return team;
    });
  }

  private mapPlayers(data: IDotaApiPlayer[]): dota2_player_insert_input[] {
    return data.map(p => {
      return {
        account_id: p.account_id,
        steam_id: p.steamid,
        avatar: p.avatar,
        avatar_medium: p.avatarmedium,
        avatar_full: p.avatarfull,
        profile_url: p.profileurl,
        persona_name: p.personaname,
        cheese: p.cheese,
        last_match_time: p.last_match_time,
        player_name: p.name,
        country_code: p.country_code,
        fantasy_role: p.fantasy_role,
        team_id: p.team_id,
        is_locked: p.is_locked,
        is_pro: p.is_pro
      };
    });
  }

  private mapTeamHeroes(teamId: number, data: IDotaTeamHero[]): dota2_team_hero_insert_input[] {
    return data.map(h => {
      return {
        hero_id: h.hero_id,
        team_id: teamId,
        games_played: h.games_played,
        wins: h.wins
      };
    });
  }

  private mapHeroes(heroes: IDotaHero[]) {
    return heroes.map(h => ({
      hero_id: h.id,
      hero_name: h.name,
      localized_name: h.localized_name,
      primary_attr: h.primary_attr,
      attack_type: h.attack_type,
      /**
       * Send Postgres text[] values through as strings
       * https://github.com/hasura/graphql-engine/issues/1170
       */
      roles: `{${h.roles.join(',')}}`,
      legs: h.legs
    }));
  }

  private mapPlayerMatches(accountId: number, recentMatches: IRecentMatch[]) {
    return recentMatches.map(rm => ({
      match_id: rm.match_id,
      player_slot: rm.player_slot,
      radiant_win: rm.radiant_win,
      duration: rm.duration,
      hero_id: rm.hero_id,
      account_id: accountId,
      start_time: rm.start_time,
      kills: rm.kills,
      deaths: rm.deaths,
      assists: rm.assists,
      xp_per_min: rm.xp_per_min,
      gold_per_min: rm.gold_per_min,
      hero_damage: rm.hero_damage,
      tower_damage: rm.tower_damage,
      hero_healing: rm.hero_healing,
      last_hits: rm.last_hits
    }));
  }
}
