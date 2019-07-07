import axios from 'axios';

const baseUrl = 'https://api.opendota.com/api';

export default {
  fetchTeams: async <T>() => await axios.get<T>(baseUrl + '/teams'),
  fetchPlayers: async <T>() => await axios.get<T>(baseUrl + '/players'),
  fetchHeroes: async <T>() => await axios.get<T>(baseUrl + '/heroes'),
  fetchTeamHeroes: async <T>(teamId: string) => await axios.get<T>(baseUrl + `/teams/${teamId}/heroes`),
  fetchRecentMatches: async <T>(playerAccountId: string) => await axios.get<T>(baseUrl + `/players/${playerAccountId}/recentmatches`) 
}
