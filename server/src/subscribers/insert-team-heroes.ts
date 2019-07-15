import { subscribe } from '../../../message-broker/src/subscribe-topic';
import dotaApi from '../dota-api';
import DotaService from '../dota-service';

subscribe('dota2', 'team.heroes.insert', async msg => {
  if (msg) {
    try {
      const { teamId } = JSON.parse(msg.content.toString());
      const heroes = await dotaApi.fetchTeamHeroes(teamId);
      const teamHeroes = heroes.data.map(hero => {
        
      });
      new DotaService().setTeamHeroes()
    } catch (err) {
      throw err;
    }
  }
});