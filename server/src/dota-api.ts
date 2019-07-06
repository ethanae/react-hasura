import axios from 'axios';

const baseUrl = 'https://api.opendota.com/api';

export default {
  fetchTeams: async () => await axios.get(baseUrl + '/teams'),
  fetchPlayers: async () => await axios.get(baseUrl + '/players'),
  fetchHeroes: async () => await axios.get(baseUrl + '/heroes'),
  fetchTeamHeroes: async (teamId: string) => await axios.get(baseUrl + `/teams/${teamId}/heroes`),
  fetchRecentMatches: async (playerAccountId: string) => await axios.get(baseUrl + `/players/${playerAccountId}/recentmatches`) 
}
