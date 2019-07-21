
import { subscribe } from '../../../message-broker/lib/subscribe-topic';
import dotaApi from '../dota-api';
import DotaService from '../dota-service';

subscribe('dota2', 'team.heroes.insert', async msg => {
  if (msg) {
    try {
      const { teamId } = JSON.parse(msg.content.toString());
      const response = await dotaApi.fetchTeamHeroes(teamId);
      await new DotaService().setTeamHeroes(teamId, response.data);
    } catch (err) {
      throw err;
    }
  }
});

subscribe('dota2', 'player.matches.insert', async msg => {
  if (msg) {
    try {
      const { accountId } = JSON.parse(msg.content.toString());
      const response = await dotaApi.fetchRecentMatches(accountId);
      await new DotaService().setPlayerMatches(accountId, response.data);
    } catch (err) {
      throw err;
    }
  }
});