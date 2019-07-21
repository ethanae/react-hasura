import axios from 'axios';
import { IDotaApiTeam, IDotaApiPlayer, IDotaTeamHero, IDotaHero, IRecentMatch } from './types/dota-api-types';

const baseUrl = 'https://api.opendota.com/api';

export default {
  fetchTeams: async () => await axios.get<IDotaApiTeam[]>(baseUrl + '/teams'),
  fetchPlayers: async () => await axios.get<IDotaApiPlayer[]>(baseUrl + '/proPlayers'),
  fetchHeroes: async () => await axios.get<IDotaHero[]>(baseUrl + '/heroes'),
  fetchTeamHeroes: async (teamId: string) => await axios.get<IDotaTeamHero[]>(baseUrl + `/teams/${teamId}/heroes`),
  fetchRecentMatches: async (playerAccountId: number) => await axios.get<IRecentMatch[]>(baseUrl + `/players/${playerAccountId}/recentmatches`) 
}
