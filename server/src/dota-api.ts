import axios from 'axios';
import { IDotaApiTeam, IDotaApiPlayer } from './types/dota-api-types';

const baseUrl = 'https://api.opendota.com/api';

export default {
  fetchTeams: async () => await axios.get<IDotaApiTeam[]>(baseUrl + '/teams'),
  fetchPlayers: async () => await axios.get<IDotaApiPlayer[]>(baseUrl + '/proPlayers'),
  fetchHeroes: async () => await axios.get(baseUrl + '/heroes'),
  fetchTeamHeroes: async (teamId: string) => await axios.get(baseUrl + `/teams/${teamId}/heroes`),
  fetchRecentMatches: async (playerAccountId: string) => await axios.get(baseUrl + `/players/${playerAccountId}/recentmatches`) 
}
