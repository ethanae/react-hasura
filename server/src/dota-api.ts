import axios from 'axios';
import { IDotaApiTeam, IDotaApiPlayer, IDotaTeamHero, IDotaHero, IRecentMatch } from './types/dota-api-types';

const baseUrl = 'https://api.opendota.com/api';

export default {
  fetchTeams: async () => {
    try {
      return await axios.get<IDotaApiTeam[]>(baseUrl + '/teams');
    } catch (err) {
      throw err;
    }
  },
  fetchPlayers: async () => {
    try {
      return await axios.get<IDotaApiPlayer[]>(baseUrl + '/proPlayers');
    } catch (err) {
      throw err;
    }
  },
  fetchHeroes: async () => {
    try {
      return await axios.get<IDotaHero[]>(baseUrl + '/heroes');      
    } catch (err) {
      throw err;
    }
  },
  fetchTeamHeroes: async (teamId: string) => {
    try {
      return await axios.get<IDotaTeamHero[]>(baseUrl + `/teams/${teamId}/heroes`)
    } catch (err) {
      throw err;
    }
  },
  fetchRecentMatches: async (playerAccountId: number) => {
    try {
      return await axios.get<IRecentMatch[]>(baseUrl + `/players/${playerAccountId}/recentmatches`);
    } catch (err) {
      throw err;
    }
  }
}
