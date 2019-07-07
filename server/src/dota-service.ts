import DotaGqlRepository from './dota-gql-repository';
import DotaApi from './dota-api';
import { setTeams as _setTeams } from './gql-queries';
import { insert_dota2_teamVariables, insert_dota2_team } from './types/insert_dota2_team';
import { IDotaApiTeam } from './types/dota-api-types';
import { dota2_team_insert_input } from './types/graphql-server-types';

export default class DotaService {
  private readonly dotaRepository: DotaGqlRepository;
  constructor() {
    this.dotaRepository = new DotaGqlRepository();
  }

  async setTeams() {
    try {
      const result = await DotaApi.fetchTeams<IDotaApiTeam[]>();
      return (
        await 
          this.dotaRepository
          .set<insert_dota2_teamVariables, insert_dota2_team>(_setTeams.stringified, { objects: this.mapTeams(result.data) })
      );
    } catch (err) {
      console.error({ err });
      throw err;
    }
  }

  async setPlayers() {
    try {
      const result = (await DotaApi.fetchTeams()).data;
      
    } catch (err) {
      console.error({ err });
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
}


