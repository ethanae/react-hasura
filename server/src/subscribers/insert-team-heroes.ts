import { subscribe } from '../../../message-broker/src/subscribe-topic';
import dotaApi from '../dota-api';
import DotaService from '../dota-service';

subscribe('dota2', 'team.heroes.insert', async msg => {
  if (msg) {
    try {
      const { teamId } = JSON.parse(msg.content.toString());
      const response = await dotaApi.fetchTeamHeroes(teamId);
      await new DotaService().setTeamHeroes(response.data);
    } catch (err) {
      throw err;
    }
  }
});